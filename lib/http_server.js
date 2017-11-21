'use strict';
const url = require('url');
const thrift = require('thrift');
const get = require('lodash.get');
const TBufferedTransport = thrift.TBufferedTransport;
const TBinaryProtocol = thrift.TBinaryProtocol;
/**
 *  create http server
 * @typedef {Object} serviceConfig
 * @property {Object} transport - The layered transport to use (defaults
 *                                to TBufferedTransport).
 * @property {Object} protocol - The serialization Protocol to use (defaults to
 *                               TBinaryProtocol).
 * @property {Object} processor - The Thrift Service class/processor generated
 *                                by the IDL Compiler for the service (the "cls"
 *                                key can also be used for this attribute).
 * @property {Object} handler - The handler methods for the Thrift Service.
 *
 * @param {any} router router
 * @param {Map<string,serviceConfig>} services services
 */
function createHttpServerHandler(services) {
  services.forEach((serviceConfig, uri) => {
    serviceConfig.transport = serviceConfig.transport ? serviceConfig.transport : TBufferedTransport;
    serviceConfig.protocol = serviceConfig.protocol ? serviceConfig.protocol : TBinaryProtocol;
  });
  if (services.size === 0) return (ctx, next) => next();

  return (ctx, next) => {
    const { request } = ctx;
    const uri = url.parse(request.url).pathname;
    if (!services.has(uri)) return next();
    const thriftService = services.get(uri);

    const service = get(ctx, thriftService.handler);
    const processor = new thriftService.processor(service);
    if (!thriftService) {
      return next();
    }

    return new Promise((resolve, reject) => {
      request.req.on('data', thriftService.transport.receiver(function(transportWithData) {
        const input = new thriftService.protocol(transportWithData);
        const output = new thriftService.protocol(new thriftService.transport(undefined, function(buf) {
          resolve(buf);
        }));

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
    }).then(result => {
      ctx.body = result;
      console.log(result);
    }).catch(e => { console.log('error', e); });
  };


}


module.exports = createHttpServerHandler;
