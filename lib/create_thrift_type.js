'use strict';
const path = require('path');

function createThriftType(app) {
  if (!(app.config.thrift && app.config.thrift.clients && app.config.thrift.clients.length > 0)) return;
  const config = app.config.thrift;
  if (config.package) {
    return config.package;
  }
  const packageDir = path.resolve(app.baseDir, 'thrift');
  return require(packageDir);

}
module.exports = createThriftType;
