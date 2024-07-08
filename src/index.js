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

  const tweet = await tweetRepo.getWithComments("668bfef184a27fb28c35a284");
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
