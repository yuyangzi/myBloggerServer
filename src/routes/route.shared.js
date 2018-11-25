// 请求返回梯格式
class ResultBodyModel {
  constructor(code = 200, message = '', results = {}) {
    this.code = code;
    this.message = message;
    this.results = results
  }
}


module.exports = {
  ResultBodyModel,
};
