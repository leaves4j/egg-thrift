'use strict';

const { MultiplexedProcessor } = require('n-thrift');

class MultiplexedService {
  /**
   * constructor
   * @param {Object} config
   * @param {string} config.processor
   * @param {string} config.service
   * @param {boolean} config.multiplexed
   * @param {string} config.serviceName
   * @param {Object} config.transport
   * @param {Object} config.protocol
   * @param {string} config.connectType
   * @param {string} config.host
   * @param {string} config.path
   * @param {string} config.port
   * @param {Object} config.headers
   */
  constructor(config) {
    this.options = config.options;
    this.serviceId = config.connectType === 'tcp' ? config.port : config.options.path;
    this.serviceMap = new Map();
  }

  /**
   * get processor instance
   * @param {*} ctx context
   * @return {*} processor instance
   */
  getProcessor(ctx) {
    const processor = new MultiplexedProcessor();
    this.serviceMap.forEach(service => {
      Reflect.defineProperty(processor, service.config.serviceName, {
        enumerable: true,
        get() {
          return service.getProcessor(ctx);
        },
      });
    });
    return processor;
  }

  addService(service) {
    this.serviceMap(service.serviceId, service);
  }
}

module.exports = MultiplexedService;
