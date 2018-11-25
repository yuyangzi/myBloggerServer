const mongoose = require('mongoose');
const Article = mongoose.model('Article');

/**
 * 按页数和数目获取文章摘要
 * @param pagination: number (页码)
 * @param amount: number (数目)
 */
const getArticleSummary = async (pagination, amount) => {
  pagination = pagination || 1;
  amount = amount || 5;
  return await Article.find(null, null, {
    limit: amount,
    skip: pagination * amount - 1
  });
};


module.exports = {
  getArticleSummary
};
