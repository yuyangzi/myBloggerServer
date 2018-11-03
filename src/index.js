const Koa = require('koa');

const {connect, initAdmin, initSchema} = require('./database/index');

const {middleWaresRouter} = require('./middlewares/router');

(async () => {
  const app = new Koa();

  // use路由中间件
  middleWaresRouter(app);

  /********初始数据库*******/
  await connect();
  initSchema();
  await initAdmin();

  // 指定端口
  app.listen(4800);

})();
