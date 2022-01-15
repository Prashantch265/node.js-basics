const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
    data.nums.forEach((num) => {
        parentPort.postMessage({ num: num });
      });
});
