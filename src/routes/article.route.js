const {getArticleSummary} = require('../service/article.service');
const {controller, get} = require('../lib/decorator');
const {ResultBodyModel} = require('./route.shared');

const getRequestURLArray = [{api: '/getArticle/', method: 'getArticle'}];

class ArticleController {
  async getArticle(ctx) {
    const {pagination, amount} = ctx.body;
    const articleDate = await getArticleSummary(pagination, amount);
    return ctx.body = new ResultBodyModel(200, '', articleDate)
  }
}

controller('/api/v0/article')(ArticleController);
getRequestURLArray.forEach(item => {
  get(item.api)(ArticleController.prototype, item.method);
});
