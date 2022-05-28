// npm i express
// 導入 express 模組
const express = require("express");
// 利用 express 來建立一個 express application
const app = express();

// express 是一個由 middleware(中間件/中間函式) 組成的世界
// express 的中間件都會吃三個參數 request, response, next


// client - server
// client send request ---> server
//                     <--- response
// request-response cycle
// client: browser, postman, node.js,...(發出請求的就是 client 端)

// 一般中間件
app.use((request, response, next)=>{
  console.log('我是一個沒有用的中間件 AAAA');
  next();   // 必須要有 next 或 response 不然會中斷
});

app.use((request, response, next)=>{
  console.log('我是一個沒有用的中間件 BBBB');
  next();
});


// HTTP request
// merhod: get, post, put, delete, ...
// 路由中間件(要對網址)
app.get("/", (request, response, next) => {
  response.send("首頁");
  // 送回 response，結束了 request-response cycle
});

app.use((request, response, next)=>{
  console.log('我是一個沒有用的中間件 CCCC');
  next();
})

app.get("/about", (request, response, next) => {
  response.send("About Me");
});

app.get("/products", (request, response, next) => {
  response.send("There are sooooooo many good products here~");
});

app.get("/login", (request, response, next) => {
  response.send("Welcome and have your personal serve!");
});

app.get('/error', (req, res, next)=>{
  // 發生錯誤，你都一個錯誤出來
  throw new Error('測試測試');
  // 或是 next() 裡面傳任何參數
  // next('X');
  // 都會跳到錯誤處理中間件
});

// 這個中間件在所有路由的後面
// 會到這裡，表示前面所有的路由中間件都沒有比到符合的網址
// => 404
app.use((req, res, next)=>{
  console.log('所有路由的後面 ==> 404', req.path);
  res.status(404).send('Not Found');
});

// 5xx 伺服器端錯誤，唯一一個有 4 個參數的錯誤處理中間件
app.use((err, req, res, next)=>{
  console.log('來自四個參數的錯誤處理中間件', req.path, err);
  // req.path 哪一個地方發生錯誤; err 錯誤訊息是什麼
  res.status(500).send('Server Error: 請洽系統管理員');
});

app.listen(3001, () => {
  console.log("Server staart at 3001.");
});