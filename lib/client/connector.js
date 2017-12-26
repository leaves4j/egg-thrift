'use strict';
const EventEmitter = require('events');
const url = require('url');
const {
  createConnection,
  createHttpConnection,
  createSSLConnection,
  TBufferedTransport,
  TBinaryProtocol,
} = require('n-thrift');

const connection = Symbol('connection');
const defaultConfig = {
  transport: TBufferedTransport,
  protocol: TBinaryProtocol,
  connectType: 'tcp',
  host: '127.0.0.1',
  path: '', // only works when connection type is http
  port: '80',
  headers: {},
};

class Connector extends EventEmitter {
  constructor(config) {
    super();
    this.config = Object.assign({}, defaultConfig, config);
    const { connectType, host, port, path } = this.config;
    this.uri = url.resolve(`${connectType}://${host}:${port}`, path || '/');
    this[connection] = null;
    this.client = null;
  }

  get connection() {
    if (!this[connection]) this.createConnection();
    return this[connection];
  }

  createConnection() {
    const { connectType, transport, protocol, host, path, port, headers } = this.config;
    switch (connectType) {
      case 'tcp':
        this[connection] = createConnection(host, port, { transport, protocol });
        break;
      case 'tls':
        this[connection] = createSSLConnection(host, port, { transport, protocol });
        break;
      case 'http':
        this[connection] = createHttpConnection(host, port, { transport, protocol, https: false, path, headers });
        break;
      case 'https':
        this[connection] = createHttpConnection(host, port, { transport, protocol, https: true, path, headers });
        break;
      default:
        throw new Error(`Invalid connect type '${connectType}'`);
    }

    this[connection].on('close', this.reset());
    this[connection].on('error', e => this.emit('error', e));
    this[connection].on('connect', e => this.emit('connect', e));
    this[connection].on('timeout', e => this.emit('timeout', e));
  }

  reset() {
    this[connection] = null;
    this.client = null;
  }

  destroy() {
    if (this[connection] && (this.config.connectType === 'tcp' || this.config.connectType === 'tls')) {
      this[connection].end();
    }
  }
}

module.exports = Connector;
