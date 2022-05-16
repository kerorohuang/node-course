let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    // 做非同步工作
    setTimeout(() => {
      let dt = new Date();
      let result = `完成工作: ${job} at ${dt.toISOString()}`;
      resolve(result); // resolve 就是會做 result 這件事
    }, timer);
  });
};

async function main() {
  let awaitBrush = await doWork("刷牙", 3000);
  console.log(awaitBrush);

  let awaitEat = await doWork("吃早餐", 5000);
  console.log(awaitEat);

  let awaitHW = await doWork("寫功課", 3000);
  console.log(awaitHW);
}

main();

// // promise
// // 刷牙 (3000) -> 吃早餐 (5000) -> 寫功課 (3000)
// let doBrushPromise = doWork("刷牙", 3000);
// // console.log(doBrushPromise);  // => Promise { <pending> }
// doBrushPromise
//   .then((result) => {
//     // 這邊就接到「刷牙」成功的結果
//     console.log(result);

//     let doEatPromise = doWork("吃早餐", 5000);
//     return doEatPromise;
//   })
//   .then((result) => {
//     // 這邊就接到「吃早餐」成功的結果
//     console.log(result);

//     let doHWPromise = doWork("寫功課", 3000);
//     return doHWPromise;
//   })
//   .then((result) => {
//     console.log(result);
//   });
// // Promise chain
