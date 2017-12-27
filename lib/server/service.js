'use strict';

const assert = require('assert');
const lodashGet = require('lodash.get');
class Service {
  /**
   * constructor
   * @param {*} thriftType
   * @param {Object} config
   * @param {string} config.processor
   * @param {string} config.service
   * @param {boolean} config.multiplexed
   * @param {string} config.serviceName
   * @param {string} config.connectType
   * @param {string} config.host
   * @param {string} config.port
   * @param {Object} config.options
   */
  constructor(thriftType, config) {
    this.config = config;
    this.options = config.options;
    this.serviceId = config.connectType === 'tcp' ? config.port : config.options.path;
    this.servicePath = config.service;
    this.Processor = lodashGet(thriftType, config.processor);
    assert(this.processor, `There is no processor in path '${config.client}'`);
  }

  /**
   * get processor instance
   * @param {*} ctx context
   * @return {*} processor instance
   */
  getProcessor(ctx) {
    const service = lodashGet(ctx.service, this.servicePath);
    assert(service, `There is no service in path '${this.servicePath}'`);
    return new this.Processor(service);
  }
}

module.exports = Service;
