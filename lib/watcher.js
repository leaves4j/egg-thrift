'use strict';

const path = require('path');
const { THRIFT_TYPE } = require('./types');
const createThriftType = require('./create_thrift_type');
const thriftCompiler = require('./compiler');

function createWatcher(app) {
  const config = app.config.thrift;
  if (!(config && config.package === 'null')) return;

  const packageDir = path.resolve(app.baseDir, config.dir);
  app.watcher.watch(packageDir, async () => {
    await thriftCompiler(app);
    app[THRIFT_TYPE] = createThriftType(app);
    app.thriftServiceManager.reset();
    app.thriftClientManager.reset();
  });
}

module.exports = createWatcher;
