// npm i express
// 導入 express 模組
const express = require("express");
// 利用 express 來建立一個 express application
const app = express();

const path = require("path");

// 使用第三方開發的中間件 cors
const cors = require("cors");
app.use(cors());

const { query } = require("express");
require("dotenv").config();

let pool = require("./utils/db");

// express.urlencoded 要讓 express 認得 req 裡 body 裡面的資料
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 req 裡的 json
app.use(express.json());

// express 處理靜態資料
// 靜態資料：html, css 檔案, JavaScript 檔案, 圖片, 影音檔,...
// static 是少數 express 內建的中間件
// 方法1: 不要指定網址
app.use(express.static(path.join(__dirname, "assets")));
// http://localhost:3001/images/test_1.JPG

// 方法2: 指定網址 aaa
app.use("/aaa", express.static(path.join(__dirname, "public")));
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

// app.get("/error", (req, res, next) => {
//   // 發生錯誤，你都一個錯誤出來
//   throw new Error("測試測試");
//   // 或是 next() 裡面傳任何參數
//   // next('X');
//   // 都會跳到錯誤處理中間件
// });

const stockRouter = require("./routers/stockRouter");
app.use("/api/stocks", stockRouter); // 可以加上'/api'，表示 response 的東西就是 json

const AuthRouter = require("./routers/authRouter");
app.use("/api/auth", AuthRouter);

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
