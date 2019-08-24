const handleUserRouter = (req, res) => {
  const { method } = req;

  // 获取path
  const { url } = req;
  const path = url.split('?')[0];

  // 获取博客的接口
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是用户登录接口',
    };
  }
};

module.exports = handleUserRouter;
