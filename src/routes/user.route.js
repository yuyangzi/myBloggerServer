const {checkPassword} = require('../service/user.service');

const {controller, post} = require('../lib/decorator');

const postRequestURL = ['login'];

class UserController {
  async login(ctx, next) {
    const {email, password} = ctx.body;
    const matchData = await checkPassword(email, password);
    if (!matchData.user) {
      return (ctx.body = {
        code: 400,
        message: '用户不存在',
      })
    }
    if (matchData.match) {
      return (ctx.body = {
        code: '0',
        message: '登录成功'
      })
    }
    return (ctx.body = {
      code: 401,
      message: '用户或密码错误'
    })
  }
}

controller('/api/v0/user')(UserController);
postRequestURL.forEach(key => {
  const API = `/${key}/`;
  post(API)(UserController.prototype, key)
});
