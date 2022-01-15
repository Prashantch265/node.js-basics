const { Worker } = require("worker_threads");

// Sharing memory between two threads like this could result in race conditions in the program.
// Race conditions occur when two threads try to read and write to the same memory location at the same time.
// Atomics ensures that one read or write operation is finished before starting the next operation.
let nums = [];

function producer(msg) {
  nums.push(msg);
}

for (let i = 1; i <= 40; i++) {
  producer(i);
}

//get size of the array buffer with int32 size buffer for each element in the array
const size = Int32Array.BYTES_PER_ELEMENT * nums.length;

//create the buffer for the shared array
const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);

nums.forEach((num, index) => {
  Atomics.store(sharedArray, index, num);
});

//create new worker

// Worker class to create a new worker thread
// new Worker(filename[, options])
// the worker can access the value of “num” passed when it was created
// const worker = new Worker("./worker.js", {workerData: {num: num}});

const worker1 = new Worker("./worker.js");

//listen for a message from worker
worker1.on("message", (result) => {
  console.log(`${result.num} th fibonnaci number: ${result.fib}`);
});

worker1.on("error", (err) => {
  console.log(err);
});

const worker2 = new Worker("./worker2.js");

worker2.on("message", (result) => {
  console.log(`${result.num} printed`);
});

worker2.on("error", (err) => {
  console.log(err);
});

// instead of passing data through the workerData option, chooses to pass data with the messages.
// worker.postMessage({ num: 20 });
// worker.postMessage({ num: 40 });

worker1.postMessage({ nums: sharedArray });
worker2.postMessage({ nums: sharedArray });
