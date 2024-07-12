import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";
import { PORT } from "./config/serverConfig.js";
import TweetService from "./services/tweet-service.js";

import apiRoutes from "./routes/index.js";

const service = new TweetService();

process.on("uncaughtException", (err) => {
  console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception`);

  process.exit(1);
});

// DB connection
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const setupAndStart = async () => {
  app.use("/api", apiRoutes);
  const server = app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
  });

  await service.create({ content: "capital #CapCool #Satisfaction #Pleasure" });

  process.on("unhandledRejection", (err) => {
    console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
    console.log(`Server shutting down due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
};

setupAndStart();
