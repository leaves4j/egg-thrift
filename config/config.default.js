'use strict';
const thrift = require('thrift');
const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;
/**
 * egg-thrift default config
 * @member Config#thrift
 * @property {String} SOME_KEY - some description
 */
exports.thrift = {
  type: {},
  connectType: 'http',
  defaultClient: {
    transport,
    protocol,
    options: {},
  },
  clients: {
  },
  defaultService: {
    transport,
    protocol,
  },
  services: {

  },
};
