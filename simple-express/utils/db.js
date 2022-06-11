// exports = module.exports = {}

require('dotenv').config();
const mysql = require("mysql2");

// 這裡不會像爬蟲那樣，只建立一個連線
// 但是也不會幫每一個 request 都分別建立連線(資料庫承受不住)
// ----> connection pool(先請一些人)
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 為了 pool 新增的參數
    connectionLimit: 10,
  })
  .promise();

module.exports = pool;

// return module.exports
