// exports = module.exports = {};  底層的程式

let speed = 100;

brand = "Ford";

color = "RED";

run = function () {
  console.log("I am running at" + speed);
};

// 沒有匯出 speed，把不需要的資料封裝起來
module.exports = {
    brand,
    color,
    run,
}

// return module.exports;  底層的程式
