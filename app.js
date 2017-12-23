'use strict';
const createHttpClient = require('./lib/create_http_client');
const createThriftType = require('./lib/create_thrift_type');
/**
 *
 * @param {Egg.Application} app
 */
module.exports = app => {
  app.config.coreMiddleware.push('thriftHandler');
  createHttpClient(app);
  createThriftType(app);
};
