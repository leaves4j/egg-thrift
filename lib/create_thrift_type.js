'use strict';
function createType(app) {
  app.thriftType = app.config.thrift.type;
}
module.exports = createType;
