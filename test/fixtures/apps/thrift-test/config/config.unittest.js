'use strict';

const thrift = require('n-thrift');
const TBufferedTransport = thrift.TBufferedTransport;
const TBinaryProtocol = thrift.TBinaryProtocol;

exports.keys = '123123';
/**
 * egg-thrift default config
 * @member Config#thrift
 */
exports.thrift = {
  package: null,
  dir: 'thrift',
  compilerOptions: {},
  thriftOptions: {
    timeout: 5000,
  },
  defaultClientConfig: {
    connectType: 'tcp',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
    },
  },
  defaultServiceConfig: {
    connectType: 'http',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
    },
  },
  clients: [
    {
      client: '',
      alias: '',
      connectType: 'http',
      options: {
        host: '127.0.0.1',
        path: '',
        port: '80',
      },
    },
  ],
  services: [
    {
      service: 'test',
      processor: 'bob.test.ShareServer',
      connectType: 'http',
      options: {
        path: '/test',
      },
    },
  ],
};

exports.security = {
  csrf: {
    enable: false,
  },
};
