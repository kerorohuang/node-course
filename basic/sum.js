// 回傳 1 + 2 + ... + n 的結果
function sum(n) {
  return ((n + 1) * n) / 2;
}

console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(100)); // 5050

// n=1 -> 1
// n=2 -> (1+2)2/2
// n=3 -> (1+3)3/2
// n=10 -> (1+10)10/2
