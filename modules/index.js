// 方法1: 引用所有物件
// let car = require("./car"); // 自己寫的模組不會放在 node modules 裡 -> 寫相對路徑

// console.log(car);   // { brand: 'Ford', color: 'RED', run: [Function (anonymous)] }
// console.log(car.brand);   // Ford
// car.run();   // I am running at100

// 方法2: 只引用需要的
// let { brand } = require("./car");
// console.log(brand);   // Ford

// 推薦第一種，比較清楚

const first = require("./first");  // I am first
const second = require("./second");   // I am second



