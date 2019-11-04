// eslint-disable-next-line consistent-return
const handleBlogRouter = (req, res) => {
  const { method } = req;

  // 获取path
  const { url } = req;
  const path = url.split('?')[0];

  // 获取博客的接口
  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '这是获取博客的接口',
    };
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情的接口',
    };
  }

  // 新建博客的接口
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新建博客的接口',
    };
  }

  // 更新博客的接口
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口',
    };
  }

  return null;
};

module.exports = handleBlogRouter;
