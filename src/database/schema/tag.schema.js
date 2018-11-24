const mongoose = require('mongoose');
const {updateUpdateAt} = require('../shaerd.methods');

const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const tagSchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  article: [
    {
      type: ObjectId,
      ref: 'Article',
    }
  ],
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

tagSchema.pre('save', updateUpdateAt);

mongoose.model('Tag', tagSchema);
