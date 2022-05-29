// npm i express
// 導入 express 模組
const express = require("express");
// 利用 express 來建立一個 express application
const app = express();

const path = require('path');

// 使用第三方開發的中間件 cors
const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');
const { query } = require("express");
require('dotenv').config();

// 這裡不會像爬蟲那樣，只建立一個連線
// 但是也不會幫每一個 request 都分別建立連線(資料庫承受不住)
// ----> connection pool(先請一些人)
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // 為了 pool 新增的參數
  connectionLimit: 10,
}).promise();

// express 處理靜態資料
// 靜態資料：html, css 檔案, JavaScript 檔案, 圖片, 影音檔,...
// static 是少數 express 內建的中間件
// 方法1: 不要指定網址
app.use(express.static(path.join(__dirname, 'assets')));
// http://localhost:3001/images/test_1.JPG

// 方法2: 指定網址 aaa
app.use('/aaa', express.static(path.join(__dirname, 'public')));
// http://localhost:3001/aaa/images/test_2.JPG

// 一般中間件
app.use((request, response, next) => {
  // console.log("我是一個沒有用的中間件 AAAA");
  next(); // 必須要有 next 或 response 不然會中斷
});

app.use((request, response, next) => {
  // console.log("我是一個沒有用的中間件 BBBB");
  next();
});

// HTTP request
// merhod: get, post, put, delete, ...
// 路由中間件
app.get("/", (request, response, next) => {
  response.send("首頁");
});

// 一般中間件
app.use((request, response, next) => {
  // console.log("我是一個沒有用的中間件 CCCC");
  next();
});

// 路由中間件
app.get("/about", (request, response, next) => {
  response.send("About Me");
});

app.get("/products", (request, response, next) => {
  response.send("There are sooooooo many good products here~");
});

app.get("/login", (request, response, next) => {
  response.send("Welcome and have your personal serve!");
});

// app.get("/error", (req, res, next) => {
//   // 發生錯誤，你都一個錯誤出來
//   throw new Error("測試測試");
//   // 或是 next() 裡面傳任何參數
//   // next('X');
//   // 都會跳到錯誤處理中間件
// });


// stocks
app.get('/stocks',async (req, res, next) => {
  // console.log("我是股票列表");
  let [data, fields] = await pool.execute("SELECT * FROM stocks");
  res.json(data);
});

// 取得某個股票 id 的資料
app.get('/stocks/:stockId', async(req, res, next) => {
  // 取得網址上的參數 req.params
  // req.params.stockId
  // let [data, fields] = await pool.execute("SELECT * FROM stock_prices WHERE stock_id = ?", [req.params.stockId]);

  // RESTful 風格之下，鼓勵把這種過濾參數用 query string 來傳遞
  // stocks/:stockId?page=1
  // 取得目前在第幾頁，而且利用 || 這個特性來做預設值
  // 如果網址上沒有 page 這個 query string，那 req.query.page 會是 undefined
  // undefined 會是 false，所以
  let page = req.query.page || 1;
  console.log('current page', page);

  // 取得目前的總筆數
  let [allResults, fields] = await pool.execute("SELECT * FROM stock_prices WHERE stock_id = ?", [req.params.stockId]);
  const total = allResults.length;
  console.log('total', total);

  // 計算總共有幾頁
  let aPage = 5;
  let totalPage = Math.ceil(total/aPage);
  console.log('totalPage', totalPage);

  // 計算 offset 是多少(計算要跳過幾筆)
  let offset = (page-1) * aPage;
  console.log('offset', offset);

  // 取得這一頁的資料 select * ... limit ? offset ?
  let [pageResults] = await pool.execute("SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC LIMIT ? OFFSET ?", [req.params.stockId, aPage, offset]);

  // 回覆給前端

  // 空資料(查無資料)有兩種處理方式:
  // 1. 200 OK 就回 []
  // 2. 回覆 404
  if(pageResults.length === 0){
    // 404 範例
    res.status(404).json(pageResults);
  } else {
    res.json({
      // 用來儲存所有跟頁碼相關的資訊
      pagination:{
        total, 
        totalPage, 
        page
      },
      // 真正的資料
      data: pageResults,
    });
  }
});


// 這個中間件在所有路由的後面
// 會到這裡，表示前面所有的路由中間件都沒有比到符合的網址
// => 404
app.use((req, res, next) => {
  console.log("所有路由的後面 ==> 404", req.path);
  res.status(404).send("Not Found");
});

// 5xx 伺服器端錯誤，唯一一個有 4 個參數的錯誤處理中間件
app.use((err, req, res, next) => {
  console.log("來自四個參數的錯誤處理中間件", req.path, err);
  // req.path 哪一個地方發生錯誤; err 錯誤訊息是什麼
  res.status(500).send("Server Error: 請洽系統管理員");
});

app.listen(3001, () => {
  console.log("Server staart at 3001.");
});