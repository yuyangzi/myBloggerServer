const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: '3306',
  database: 'myblog',
});

connection.connect();

const sql = 'SELECT * FROM users';

connection.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

module.exports = {
  connection,
};
