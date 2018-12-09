const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const {
  connect,
  initAdmin,
  initSchema
} = require('./database/index');
const {
  middleWaresRouter
} = require('./middlewares/router');
const {
  PORT
} = require('./config/env.config.js');

(async () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
  }));
  app.use(async (ctx, next) => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
    await next();
  });
  /********初始数据库*******/
  await connect();
  initSchema();
  await initAdmin();
  // use路由中间件
  middleWaresRouter(app);
  // 指定端口
  app.listen(PORT);

})();
