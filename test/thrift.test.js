'use strict';
// const { createHttpConnection, TBufferedTransport, TBinaryProtocol, createHttpClient } = require('n-thrift');
const assert = require('assert');
const mm = require('egg-mock');

describe('test/thrift.test.js', () => {
  let app;
  before(async () => {
    app = mm.app({
      baseDir: 'apps/thrift-test',
    });
    await app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('app.thriftType', () => {
    assert(app.thriftType);
  });

  it('should GET /', async () => {
    await app.httpRequest()
      .post('/test')
      .expect(200);
    // const conn = createHttpConnection('localhost', 7000, {
    //   protocol: TBinaryProtocol,
    //   transport: TBufferedTransport,
    //   options: {
    //     path: '/test',
    //     nodeOptions: {
    //       agent:app.httpRequest.agent
    //     },
    //   },
    // });
    // const client = createHttpClient(app.thriftType.bob.test.ShareClient, conn);
    // assert(client.hello);
    // const result = await client.hello();
    // assert(result === 'hello');
  });

});
