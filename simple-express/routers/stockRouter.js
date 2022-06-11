// 建立一個 routers 檔案夾
// 在 routers 裡，建立一個 stockRouter.js

const express = require("express");
const router = express.Router(); // 用express.Router() 做一個 router
// router is a mini-app

const pool = require("../utils/db");

// stocks
router.get("/", async (req, res, next) => {
  // console.log("我是股票列表");
  let [data, fields] = await pool.execute("SELECT * FROM stocks");
  res.json(data);
});

// 取得某個股票 id 的資料
router.get("/:stockId", async (req, res, next) => {
  // 取得網址上的參數 req.params
  // req.params.stockId
  // let [data, fields] = await pool.execute("SELECT * FROM stock_prices WHERE stock_id = ?", [req.params.stockId]);

  // RESTful 風格之下，鼓勵把這種過濾參數用 query string 來傳遞
  // stocks/:stockId?page=1
  // 取得目前在第幾頁，而且利用 || 這個特性來做預設值
  // 如果網址上沒有 page 這個 query string，那 req.query.page 會是 undefined
  // undefined 會是 false，所以
  let page = req.query.page || 1;
  console.log("current page", page);

  // 取得目前的總筆數
  let [allResults, fields] = await pool.execute(
    "SELECT * FROM stock_prices WHERE stock_id = ?",
    [req.params.stockId]
  );
  const total = allResults.length;
  console.log("total", total);

  // 計算總共有幾頁
  let aPage = 5;
  let totalPage = Math.ceil(total / aPage);
  console.log("totalPage", totalPage);

  // 計算 offset 是多少(計算要跳過幾筆)
  let offset = (page - 1) * aPage;
  console.log("offset", offset);

  // 取得這一頁的資料 select * ... limit ? offset ?
  let [pageResults] = await pool.execute(
    "SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC LIMIT ? OFFSET ?",
    [req.params.stockId, aPage, offset]
  );

  // 回覆給前端

  // 空資料(查無資料)有兩種處理方式:
  // 1. 200 OK 就回 []
  // 2. 回覆 404
  if (pageResults.length === 0) {
    // 404 範例
    res.status(404).json(pageResults);
  } else {
    res.json({
      // 用來儲存所有跟頁碼相關的資訊
      pagination: {
        total,
        totalPage,
        page,
      },
      // 真正的資料
      data: pageResults,
    });
  }
});

module.exports = router;
