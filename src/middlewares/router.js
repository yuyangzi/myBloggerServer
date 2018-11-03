const path = require('path');
const {Route} = require('../lib/decorator');

const middleWaresRouter = (app) => {
  const apiPath = path.resolve(__dirname, '../routes');
  const route = new Route(app, apiPath);
  route.init();
};

module.exports = {
  middleWaresRouter
};
