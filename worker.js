const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
  // receive data from the parent through the workerData option
  // parentPort.postMessage(getFib(workerData.num))
  // parentPort.postMessage({ num: data.num, fib: getFib(data.num) });
  data.nums.forEach((num) => {
    parentPort.postMessage({ num: num, fib: getFib(num) });
  });
});

function getFib(num) {
  if (num == 0) {
    return 0;
  } else if (num == 1) {
    return 1;
  } else {
    return getFib(num - 1) + getFib(num - 2);
  }
}
