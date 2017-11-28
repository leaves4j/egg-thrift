'use strict';
const thrift = require('n-thrift');
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
        // const client = createThriftHttpClient(thriftClient, host, port, options);
        const connection = thrift.createHttpConnection(host, port, options);
        connection.on('error', err => {
          app.loggers.coreLogger.error(`[egg-thrift] connection error on '${host}:${port}${options.path}'`, err);
        });
        const client = thrift.createHttpClient(thriftClient, connection);
        clientCache.set(clientPath, client);
        return client;
      },
    });

  });
  app.thrift = thrift;
}

module.exports = createClient;
