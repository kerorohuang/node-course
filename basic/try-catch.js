try {
  console.log("try");
} catch (err) {
  console.error(err);
  // 若是 try 中有錯，會跳到 catch，catch 完若有 finally 會跳去 finally
} finally {
  // 不論順利或失敗都必須執行 finally
}
