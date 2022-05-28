// npm i express
// 導入 express 模組
const express = require("express");
// 利用 express 來建立一個 express application
const app = express();

// HTTP request
// merhod: get, post, put, delete, ...
app.get("/", (request, response, next) => {
  response.send("首頁");
});

app.get("/about", (request, response, next) => {
  response.send("About Me");
});

app.get("/products", (request, response, next) => {
  response.send("There are sooooooo many good products here~");
});

app.get("/login", (request, response, next) => {
  response.send("Welcome and have your personal serve!");
});

app.listen(3001, () => {
  console.log("Server staart at 3001.");
});