'use strict';

const createThriftType = require('../../lib/create_thrift_type');
const ClientManager = require('../../lib/client/client_manager');
const ServiceManager = require('../../lib/server/service_manager');
const THRIFT_TYPE = Symbol('Context#thriftType');
const THRIFT_CLIENT_MANAGER = Symbol('Context#thriftClientManager');
const THRIFT_SERVICE_MANAGER = Symbol('Context#thriftServiceManager');

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
