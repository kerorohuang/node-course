const fs = require("fs");

let p = new Promise((resolve, reject) => {
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      // 錯誤了
      // console.log('喔喔喔，發生錯誤了');
      // console.error(err);
      reject(err);
    } else {
      // 因為沒有 err，所以是正確的
      // console.log(data);
      resolve(`成功：${data}`);
    }
  });
});

async function main() {
  try {
    let awaitReadFile = await p;
    console.log(awaitReadFile);
  } catch {
    console.log(`不太對喔`);
  }
}
main();

// p.then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });
