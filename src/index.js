const express = require("express");

const { PORT } = require("./config/serverConfig");
const { connect } = require("./config/db");
const { HashtagRepository, TweetRepository } = require("./repository");
const TweetService = require("./services/tweet-service");

process.on("uncaughtException", (err) => {
  console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception`);

  process.exit(1);
});

// DB connection
connect();

const app = express();

const setupAndStart = async () => {
  const server = app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
  });

  let service = new TweetService();
  const tweet = await service.create({
    content:
      "This is after #processing really #excited, it is going to be #fun",
  });
  console.log(tweet);

  process.on("unhandledRejection", (err) => {
    console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
    console.log(`Server shutting down due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
};

setupAndStart();
