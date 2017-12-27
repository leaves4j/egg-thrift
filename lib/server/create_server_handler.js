'use strict';

function createHttpServerHandler(processor, options) {
  const { protocol, transport } = options;

  return request => {
    return new Promise((resolve, reject) => {
      request.on('data', transport.receiver(function(transportWithData) {
        const input = new protocol(transportWithData);
        const output = new protocol(new transport(undefined, resolve));

        try {
          processor.process(input, output);
          transportWithData.commitPosition();
        } catch (err) {
          if (err.name === 'InputBufferUnderrunError') {
            transportWithData.rollbackPosition();
          } else {
            reject(err);
          }
        }
      }));
    });
  };
}

exports.createHttpServerHandler = createHttpServerHandler;

