const handleBlogRouter = require('./router/blog');

const handleUserRouter = require('./router/user');

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json');

  const blogData = handleBlogRouter(req, res);

  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = handleUserRouter(req, res);

  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // 未命中router
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('404 Not Found\n');
  res.end();
};

module.exports = serverHandle;
