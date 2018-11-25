const {checkPassword} = require('../service/user.service');

const {controller, post} = require('../lib/decorator');

const {ResultBodyModel} = require('./route.shared');

const postRequestURL = ['login'];

class UserController {
  async login(ctx) {
    const {email, password} = ctx.body;
    const matchData = await checkPassword(email, password);
    if (!matchData.user) {
      return ctx.body = new ResultBodyModel(400, '用户不存在', {})
    }
    if (matchData.match) {
      return ctx.body = new ResultBodyModel(200, '登录成功', matchData.user)
    }
    return ctx.body = new ResultBodyModel(401, '用户或密码错误', {})
  }
}

controller('/api/v0/user')(UserController);
postRequestURL.forEach(key => {
  const API = `/${key}/`;
  post(API)(UserController.prototype, key)
});
