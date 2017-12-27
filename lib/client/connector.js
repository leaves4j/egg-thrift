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
  connectType: 'tcp',
  host: '127.0.0.1',
  port: '80',
  options: {
    transport: TBufferedTransport,
    protocol: TBinaryProtocol,
    https: false,
    ssl: false,
    path: '', // only works when connection type is http
    headers: {},
  },

};

class Connector extends EventEmitter {
  constructor(config) {
    super();
    this.config = Object.assign({}, defaultConfig, config);
    const { connectType, host, port } = this.config;
    const { path } = this.config.options;
    this.uri = url.resolve(`${connectType}://${host}:${port}`, path || '/');
    this[connection] = null;
    this.client = null;
  }

  get connection() {
    if (!this[connection]) this.createConnection();
    return this[connection];
  }

  createConnection() {
    const { connectType, host, port, options } = this.config;
    if (connectType === 'tcp') {
      if (!options.ssl) {
        this[connection] = createConnection(host, port, options);
      } else {
        this[connection] = createSSLConnection(host, port, options);
      }
    } else if (connectType === 'http') {
      this[connection] = createHttpConnection(host, port, options);
    } else {
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
    if (this[connection] && this.config.connectType === 'tcp') {
      this[connection].end();
    }
  }
}

module.exports = Connector;
