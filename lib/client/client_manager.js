'use strict';
const extend = require('extend2');
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
    this.thriftType = this.app.thriftType;
    this.multiplexer = new Multiplexer();
    this.config = app.config.thrift || { clients: [] };
    this.clientConfigs = [];
    this.clientMap = new Map();
    this.init(this.config.clients);
  }

  get clients() {
    return this.thriftClients;
  }

  init(clientConfigs) {
    clientConfigs.forEach(client => this.registerClient(client));
  }

  /**
   * register a client
   * @param {Object} client client config
   */
  registerClient(client) {
    this.clientConfigs.push(client);
    if (!this.thriftClients) this.thriftClients = {};
    const clientConfig = extend(true, {}, this.config.defaultClientConfig, client);
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

  reset() {
    const oldClientMap = this.clientMap;
    this.clientMap = new Map();
    this.thriftClients = null;

    this.thriftType = this.app.thriftType;
    this.multiplexer = new Multiplexer();

    this.init(this.clientConfigs);

    oldClientMap.forEach(client => {
      client.destroy();
    });
  }
}

module.exports = ClientManager;
