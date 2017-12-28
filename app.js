'use strict';
const thriftCompiler = require('./lib/compiler');
const createThriftWatcher = require('./lib/watcher');
module.exports = app => {
  app.beforeStart(async () => {
    await thriftCompiler(app);
  });
  createThriftWatcher(app);
  app.config.coreMiddleware.push('thriftServiceHandler');
};
