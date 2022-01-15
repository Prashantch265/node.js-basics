const cluster = require("cluster");
const http = require("http");
const { cpus } = require("os");
const process = require("process");

const numCpus = cpus().length;

// console.log(numCpus);

if (cluster.isPrimary) {
  console.log(`Primary running on ${process.pid} `);

  //keep track of http requests
  let numReqs = 0;

  setInterval(() => {
    console.log(`number of requests = ${numReqs}`);
  }, 10000);

  //count req
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === "notifyRequest") numReqs += 1;
  }

  // start workers and listen for messages containing notifyRequest
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on("listening", () => {
      console.log(`worker ${id} listening `);
    });
    cluster.workers[id].on("message", messageHandler);
  }

  //worker object is the reference returned by the fork()
  cluster.on("exit", (worker, code, signal) => {
    // code <number> The exit code, if it exited normally.
    // signal <string> The name of the signal (e.g. 'SIGHUP') that caused the process to be killed.
    if (signal) {
      console.log(
        `worker on ${worker.process.pid} was killed by signal: ${signal}`
      );
    } else if (code !== 0) {
      console.log(
        `worker on ${worker.process.pid} exited with error code: ${code}`
      );
    }
    cluster.fork(); //inorder to maintain the no. of workers
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello World");
      // Notify primary about the request
      process.send({ cmd: "notifyRequest" });
    })
    .listen(8000);

  //   console.log(`Primary started on ${process.pid}`);
}
