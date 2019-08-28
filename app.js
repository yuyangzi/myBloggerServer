// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const http = require('http');

const serverHandle = require('./src/index');

const server = http.createServer(serverHandle);

server.listen(process.env.PORT);
