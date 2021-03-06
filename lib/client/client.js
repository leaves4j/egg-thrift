'use strict';
const EventEmitter = require('events');
const assert = require('assert');
const lodashGet = require('lodash.get');
const { createClient } = require('n-thrift');

const Connector = require('./connector');


class Client extends EventEmitter {
  /**
   * constructor
   * @param {*} thriftType
   * @param {Object} config
   * @param {string} config.client
   * @param {string} config.alias
   * @param {boolean} config.multiplexed
   * @param {string} config.serviceName
   * @param {string} config.connectType
   * @param {string} config.host
   * @param {string} config.port
   * @param {Object} config.options

   * @param {*} multiplexer
   */
  constructor(thriftType, config, multiplexer) {
    super();
    this.alias = config.alias || config.client;
    this.clientId = config.client;
    this.clientHandler = lodashGet(thriftType, config.client);
    assert(this.clientHandler, `There is no handler in path '${config.client}'`);

    if (config.multiplexed) {
      assert(multiplexer, "constructor parameter 'multiplexer' required when multiplexed is true");
      this.multiplexer = multiplexer;
      this.serviceName = config.serviceName;
    } else {
      this.multiplexer = null;
      this.serviceName = null;
    }
    this.connectors = [];
    this.connectorCursor = 0;
    this.addConnection(config);
  }

  get client() {
    return this.createClient();
  }

  getConnector() {
    const index = this.connectorCursor;
    if (index + 1 < this.connectors.length) {
      this.connectorCursor++;
    } else {
      this.connectorCursor = 0;
    }

    return this.connectors[index];
  }

  createClient() {
    const connector = this.getConnection();
    if (connector.client) return connector.client;
    let client;
    if (this.multiplexer) {
      client = this.multiplexer.createClient(this.clientHandler, connector.connection);
    }
    client = createClient(this.clientHandler, connector.connection);
    connector.client = client;
    return client;
  }

  addConnection(config) {
    const connector = new Connector(config);
    if (this.connectors.find(conn => conn.uri === connector.uri)) return;
    connector.on('error', e => this.emit('error', e));
    connector.on('connect', e => this.emit('connect', e));
    connector.on('timeout', e => this.emit('timeout', e));
    this.connectors.push(connector);
  }

  removeConnection() {
    // TODO
  }

  reset() {
    this.cache.clear();
  }

  destroy() {
    this.connectors.forEach(connector => {
      connector.destroy();
    });
  }
}
module.exports = Client;
