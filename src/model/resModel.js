class BaseModel {
  constructor(result, message) {
    if (typeof result === 'string') {
      this.message = result;
      this.result = null;
    } else {
      this.result = result || null;
      this.message = message || null;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(result, message) {
    super(result, message);
    this.code = 200;
  }
}

class ErrorModel extends BaseModel {
  constructor(result, message, code = -1) {
    super(result, message);
    this.code = code;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
