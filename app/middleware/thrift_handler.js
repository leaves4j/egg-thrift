'use strict';
const createHttpServerHandler = require('../../lib/http_server');
module.exports = (options, app) => {
  const config = app.config;
  const { defaultService, services } = config.thrift;
  if (!defaultService || !services) return;
  const serviceMap = new Map();
  Object.keys(services).forEach(uri => {
    const serviceConfig = Object.assign({}, defaultService, services[uri]);
    serviceMap.set(uri, serviceConfig);
  });

  return createHttpServerHandler(serviceMap);
}
  ;
