'use strict';
const url = require('url');

module.exports = () => {
  return async function thriftServiceHandler(ctx, next) {
    const { request } = ctx;
    const uri = url.parse(request.url).pathname;
    const handler = ctx.app.thriftServiceManager.getHandler(uri, ctx);
    if (handler === null) {
      await next();
      return;
    }
    ctx.body = await handler(ctx.request.req);
  };
};
