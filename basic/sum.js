// 回傳 1 + 2 + ... + n 的結果

// for 迴圈
function sum1(n) {
  let total = 0;
  for (i = 1; (i <= n); i++) {
    total += i;
  }
  return total;
}

// console.log(sum(1)); // 1
// console.log(sum(2)); // 3
// console.log(sum(10)); // 55
// console.log(sum(100)); // 5050

// n=1 -> 1
// n=2 -> (1+2)2/2
// n=3 -> (1+3)3/2
// n=10 -> (1+10)10/2

// 公式解
function sum2(n) {
  return ((n + 1) * n) / 2;
}

// reduce()
[].reduce((sum, item) => sum+ item, 0);