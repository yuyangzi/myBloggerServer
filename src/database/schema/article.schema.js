const mongoose = require('mongoose');
const {updateUpdateAt} = require('../shaerd.methods');

const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const articleSchema = new Schema({
  // 标题
  articleTitle: String,
  // 简介
  articleSummary: String,
  // 海报图
  articlePoster: String,
  // 内容
  articleContent: String,
  // 分类
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  // 标签
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }],
  // 元数据
  meta: {
    // 数据创建时间
    createAt: {
      type: Date,
      default: Date.now()
    },
    // 数据更新时间
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

articleSchema.pre('save', updateUpdateAt);

mongoose.model('Article', articleSchema);
