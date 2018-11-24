const mongoose = require('mongoose');
const db = 'mongodb://localhost/blogDB';

const glob = require('glob');

const path = require('path');

// 将node全局变量Promise赋值给mongoose.Promise
mongoose.Promise = global.Promise;

// 连接数据库
const connect = () => {

  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    // 如果node是在开发环境下则启用mongoose的debug
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, {useNewUrlParser: true}).then();

    // 拿到mongoose的实例对象
    const mongodb = mongoose.connection;

    // 监听mongoose的断开事件
    mongodb.on('disconnected', () => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db).then();
      } else {
        throw Error('数据库无法连接成功');
      }
    });

    // 监听mongoose的报错事件
    mongodb.on('error', (error) => {
      console.log(error);
      reject();
    });

    // 监听mongoose的打开事件
    mongodb.once('open', () => {
      console.log('MongoDB Connected successfully!');
      resolve();
    });
  });
};

// 初始化定义的所有Schema
const initSchema = () => {
  glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

// 初始化管理员
const initAdmin = async () => {
  const User = mongoose.model('User');
  const _user = await User.findOne({
    userName: 'yuyangzi'
  });
  if (!_user) {
    const user = new User({
      userName: 'yuyangzi',
      email: 'yuyangzi@123.com',
      password: '123456789'
    });
    user.save().then();
  }
};

module.exports = {
  connect,
  initSchema,
  initAdmin,
};
