'use strict';
const assert = require('assert');
const thrift = require('thrift');
const get = require('lodash.get');
const set = require('lodash.set');

const clientCache = new Map();

function createClient(app) {
  const config = app.config;

  if (!(app.config.thrift && app.config.thrift.clients && app.config.thrift.type)) {
    return;
  }
  const clients = config.thrift.clients;
  const defaultConfig = config.thrift.defaultClient || {};
  const thriftType = config.thrift.type;
  const thrift = {};
  Object.keys(clients).forEach(clientPath => {
    const config = clients[clientPath];
    const thriftClientPath = config.client ? config.client : clientPath;
    const thriftClient = get(thriftType, thriftClientPath);
    const clientPaths = clientPath.split('.');
    const clientName = clientPaths.pop();


    let clientNamespace = get(thriftClient, clientPaths);
    if (!clientNamespace) {
      clientNamespace = {};
      set(thrift, clientPaths, clientNamespace);
      console.log('clientNamespace', thrift, clientName);
    }
    Reflect.defineProperty(clientNamespace, clientName, {
      enumerable: true,
      configurable: false,
      get() {
        if (clientCache.has(clientPath)) {
          return clientCache.get(clientPath);
        }
        const host = config.host || defaultConfig.host;
        const port = config.port || defaultConfig.port;
        const transport = config.transport || defaultConfig.transport;
        const protocol = config.protocol || defaultConfig.protocol;
        const options = Object.assign({}, config.options || defaultConfig.options, { transport, protocol });
        const client = createThriftHttpClient(thriftClient, host, port, options);
        clientCache.set(clientPath, client);
        return client;
      },
    });

  });
  app.thrift = thrift;
}

function createThriftHttpClient(client, host, port, options) {
  const connection = thrift.createHttpConnection(host, port, options);

  connection.on('connect', () => {
  });
  connection.on('error', err => {
    console.log(err);
  });
  connection.on('timeout', () => {
  });
  return thrift.createHttpClient(client, connection);
}

module.exports = createClient;
