'use strict';

module.exports = {
  get thrift() {
    return this.app.thriftClientManager.client;
  },
};
