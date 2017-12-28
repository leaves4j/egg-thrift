'use strict';
const path = require('path');

function createThriftType(app) {
  if (!app.config.thrift) return;
  const config = app.config.thrift;
  if (config.package) {
    return config.package;
  }

  const packageDir = path.resolve(app.baseDir, 'app/thrift');
  return require(packageDir);
}
module.exports = createThriftType;
