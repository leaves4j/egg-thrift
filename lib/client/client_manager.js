'use strict';
const get = require('lodash.get');
const set = require('lodash.set');
const { Multiplexer } = require('n-thrift');
const ThriftClient = require('./client');
// const createThriftType = require('../create_thrift_type');

class ClientManager {
  /**
   * constructor
   * @param {Egg.Application} app egg app
   */
  constructor(app) {
    this.app = app;
    this.thriftClients = null;
    // this.thriftType = createThriftType(app);
    this.thriftType = this.app.thriftType;
    this.multiplexer = new Multiplexer();
    this.config = app.config.thrift || { clients: [] };
    this.clientMap = new Map();
  }

  get clients() {
    if (!this.thriftClients) {
      this.createClients();
    }
    return this.thriftClients;
  }

  createClients() {
    this.config.clients.forEach(client => {
      this.registerClient(client);
    });
  }

  /**
   * register a client
   * @param {Object} client client config
   */
  registerClient(client) {
    if (!this.thriftClients) this.thriftClients = {};
    const clientConfig = Object.assign({}, this.config.defaultClientConfig, client);
    const clientId = clientConfig.client;

    let thriftClient;
    if (this.clientMap.has(clientId)) {
      thriftClient = this.clientMap.get(clientId);
      thriftClient.addConnection(clientConfig);
    } else {
      thriftClient = new ThriftClient(this.thriftType, clientConfig, this.multiplexer);
      this.clientMap.set(clientId, thriftClient);
    }

    const clientPaths = thriftClient.alias.split('.').pop();
    const clientName = clientPaths.pop();
    let clientNamespace = get(this.thriftClients, clientPaths);
    if (!clientNamespace) {
      clientNamespace = {};
      set(this.thriftClients, clientPaths, clientNamespace);
    }

    thriftClient.on('error', e => {
      this.app.coreLogger.error(`[egg-thrift]Error in client '${thriftClient.alias}'`, e);
    });
    thriftClient.on('connect', e => {
      this.app.coreLogger.info(`[egg-thrift]Client '${thriftClient.alias}' connected`, e);
    });
    thriftClient.on('timeout', e => {
      this.app.coreLogger.warn(`[egg-thrift]Client '${thriftClient.alias}' timeout`, e);
    });

    Reflect.defineProperty(clientNamespace, clientName, {
      enumerable: true,
      configurable: false,
      get() {
        return thriftClient.client;
      },
    });
  }
}

module.exports = ClientManager;
