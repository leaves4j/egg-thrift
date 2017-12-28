'use strict';

const { THRIFT_TYPE, THRIFT_CLIENT_MANAGER, THRIFT_SERVICE_MANAGER } = require('../../lib/types');
const createThriftType = require('../../lib/create_thrift_type');
const ClientManager = require('../../lib/client/client_manager');
const ServiceManager = require('../../lib/server/service_manager');

module.exports = {
  get thriftType() {
    if (!this[THRIFT_TYPE]) {
      this[THRIFT_TYPE] = createThriftType(this);
    }

    return this[THRIFT_TYPE];
  },

  get thriftClientManager() {
    if (!this[THRIFT_CLIENT_MANAGER]) {
      this[THRIFT_CLIENT_MANAGER] = new ClientManager(this);
    }
    return this[THRIFT_CLIENT_MANAGER];
  },

  get thriftServiceManager() {
    if (!this[THRIFT_SERVICE_MANAGER]) {
      this[THRIFT_SERVICE_MANAGER] = new ServiceManager(this);
    }
    return this[THRIFT_SERVICE_MANAGER];
  },

};
