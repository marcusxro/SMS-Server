const express = require('express');
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const app = express();
const port = 8080;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Optionally, restart the worker
    cluster.fork();
  });

  // Graceful shutdown for master
  process.on('SIGTERM', () => {
    console.log('Master process shutting down gracefully');
    Object.values(cluster.workers).forEach(worker => worker.kill());
    setTimeout(() => process.exit(0), 10000); // Wait for workers to close
  });

} else {
  // Worker processes
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const server = app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });

  // Graceful shutdown for workers
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log(`Worker ${process.pid} closed connections`);
      process.exit();
    });
  });
}
