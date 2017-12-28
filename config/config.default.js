'use strict';
const thrift = require('n-thrift');
const TBufferedTransport = thrift.TBufferedTransport;
const TBinaryProtocol = thrift.TBinaryProtocol;
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
    multiplexed: false,
    serviceName: '',
    connectType: 'tcp',
    host: '127.0.0.1',
    port: '80',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
      path: '',
      ssl: false,
      https: false,
      max_attempts: 3,
      retry_max_delay: 300,
      connect_timeout: 5000,
      timeout: 5000,
      nodeOptions: {},
      headers: {},
    },
  },
  defaultServiceConfig: {
    multiplexed: false,
    serviceName: '',
    connectType: 'tcp',
    host: '127.0.0.1',
    port: '80',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
      path: '',
      headers: {},
      tls: {},
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
