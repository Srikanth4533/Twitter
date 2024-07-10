import express from "express";

import { connectDB } from "./config/db.js";
import { PORT } from "./config/serverConfig.js";

process.on("uncaughtException", (err) => {
  console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception`);

  process.exit(1);
});

// DB connection
connectDB();

const app = express();

const setupAndStart = async () => {
  const server = app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
    console.log(`Server shutting down due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
};

setupAndStart();
