'use strict';
const thrift = require('n-thrift');
const TBufferedTransport = thrift.TBufferedTransport;
const TBinaryProtocol = thrift.TBinaryProtocol;
/**
 * egg-thrift default config
 * @member Config#thrift
 * @property {String} SOME_KEY - some description
 */
exports.thrift = {
  package: null,
  dir: 'thrift',
  compilerOptions: {},
  thriftOptions: {
    timeout: 5000,
  },
  defaultClientConfig: {
    multiplexed: false,
    serviceName: '',
    transport: TBufferedTransport,
    protocol: TBinaryProtocol,
    connectType: 'tcp',
    host: '127.0.0.1',
    path: '', // only works when connection type is http
    port: '80',
    headers: {
    },
  },
  defaultServiceConfig: {
    multiplexed: false,
    serviceName: '',
    transport: TBufferedTransport,
    protocol: TBinaryProtocol,
    connectType: 'tcp',
    host: '127.0.0.1',
    path: '',  // only works when connection type is http
    port: '80',
    headers: {
    },
  },
  clients: [
    // {
    //   client: '',
    //   alias: '',
    //   multiplexed: false,
    //   serviceName: '',
    //   transport: TBufferedTransport,
    //   protocol: TBinaryProtocol,
    //   connectType: 'tcp',
    //   host: '127.0.0.1',
    //   path: '', only works when connection type is http
    //   port: '80',
    //   headers: {
    //   },
    // },
  ],
  services: [
    // {
    //   service: '',
    //   processor: '',
    //   multiplexed: false,
    //   serviceName: '',
    //   transport: TBufferedTransport,
    //   protocol: TBinaryProtocol,
    //   connectType: 'tcp',
    //   host: '127.0.0.1',
    //   path: '',  only works when connection type is http
    //   port: '80',
    //   headers: {
    //   },
    // },
  ],
};
