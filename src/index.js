const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {connect, initAdmin, initSchema} = require('./database/index');
const {middleWaresRouter} = require('./middlewares/router');

(async () => {
  const app = new Koa();
  app.use(bodyParser());

  app.use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
  });
  /********初始数据库*******/
  await connect();
  initSchema();
  await initAdmin();
  // use路由中间件
  middleWaresRouter(app);

  // 指定端口
  app.listen(4800);

})();
