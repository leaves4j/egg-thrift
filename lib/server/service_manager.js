'use strict';
const extend = require('extend2');
const { createHttpServerHandler } = require('./create_server_handler');
const Service = require('./service');
const MultiplexedService = require('./multiplexed_service');

class ServiceManager {
  constructor(app) {
    this.app = app;
    this.thriftType = this.app.thriftType;
    this.config = app.config.thrift || { services: [] };
    this.serviceMap = new Map();
    this.init();
  }

  init() {
    this.config.services.forEach(service => this.registerService(service));
  }

  reset() {
    this.thriftType = this.app.thriftType;
    this.serviceMap = new Map();
    this.init();
  }

  getHandler(serviceId, ctx) {
    if (!this.serviceMap.has(serviceId)) return null;
    const service = this.serviceMap.get(serviceId);
    const processor = service.getProcessor(ctx);
    return createHttpServerHandler(processor, service.options);
  }

  registerService(config) {
    const serviceConfig = extend(true, {}, this.config.defaultServiceConfig, config);
    const service = new Service(this.thriftType, serviceConfig);

    if (service.config.multiplexed) {
      if (this.serviceMap.has(service.serviceId)) {
        this.serviceMap.get(service.serviceId).addService(service);
      } else {
        const multiplexedService = new MultiplexedService(config);
        multiplexedService.addService(service);
        this.serviceMap.set(multiplexedService.serviceId, multiplexedService);
      }
    } else {
      this.serviceMap.set(service.serviceId, service);
    }
  }
}

module.exports = ServiceManager;
