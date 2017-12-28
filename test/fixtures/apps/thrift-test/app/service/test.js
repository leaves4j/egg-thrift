'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  async hello() {
    return 'hello world!';
  }
}

module.exports = TestService;
