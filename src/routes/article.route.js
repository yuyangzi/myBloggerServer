const fs = require('fs');
const path = require('path');
const {getArticleSummary} = require('../service/article.service');
const {controller, get, post} = require('../lib/decorator');
const {ResultBodyModel} = require('./route.shared');
const {UPLOAD_FILE_PATH} = require("../config/path.config");

const getRequestURLArray = [{api: '/getArticle/', method: 'getArticle'}];
const postRequestURLArray = [{api: '/addArticle/', method: 'addArticle'}];

class ArticleController {

  // 获取文章
  async getArticle(ctx) {
    const {pagination, amount} = ctx.body;
    const articleDate = await getArticleSummary(pagination, amount);
    return ctx.body = new ResultBodyModel(200, '', articleDate)
  }

  // 新增文章
  async addArticle(ctx) {
    const ArticleObj = ctx.request.files;
    Object.entries(ArticleObj).forEach(item => {
      const key = item[0];
      const file = item[1];
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      let filePath = path.join(UPLOAD_FILE_PATH + `/${file.name}`);
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    });
    return ctx.body = new ResultBodyModel(200, '文件上传成功', {});
  }
}

controller('/api/v0/article')(ArticleController);
getRequestURLArray.forEach(item => {
  get(item.api)(ArticleController.prototype, item.method);
});

postRequestURLArray.forEach(item => {
  post(item.api)(ArticleController.prototype, item.method);
});
