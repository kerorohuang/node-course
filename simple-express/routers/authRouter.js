const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const registerRules = [
  body("email").isEmail().withMessage("Email 欄位請填寫正確格式"), // body 裡的 email 欄位要是 email | 自訂錯誤訊息
  body("password").isLength({ min: 8 }).withMessage("密碼長度至少為8"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼驗證不一致"),
];

// /api/auth/register
router.post("/register", registerRules, (req, res, next) => {
  // 1. req.params <-- 網址上的路由參數
  // 2. req.query  <-- 網址上的 query string
  // 3. req.body <-- 通常是表單 post 用的
  console.log("register body:", req.body);
  // res.json({ result: "OK" });

  // 驗證資料
  const validateResults = validationResult(req);
  console.log("validateResults", validateResults);
  if (!validateResults.isEmpty()) {
    // 不是 empty --> 表示有不符合
    let error = validateResults.array();
    return res.status(400).json(error);
  }
  // 確認 email 有沒有註冊過
  // 密碼雜湊 hash
  // save to db
  // response
  res.json({ result: "OK" });
});

module.exports = router;
