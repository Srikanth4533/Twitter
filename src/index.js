const express = require("express");

const { PORT } = require("./config/serverConfig");
const { connect } = require("./config/db");
const TweetRepository = require("./repository/tweet-repository");
const Comment = require("./models/comment");

const tweetRepo = new TweetRepository();

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

  let page = 0;
  let perPage = 3;
  let offSet = page * perPage;
  let limit = perPage;
  // const tweet = await tweetRepo.getAll(offSet, limit);
  const tweet = await tweetRepo.create({
    content: "With hooks",
    userEmail: "hook@pre.com",
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
