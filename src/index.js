import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";
import { PORT } from "./config/serverConfig.js";
import TweetService from "./services/tweet-service.js";

import apiRoutes from "./routes/index.js";
import UserRepository from "./repository/user-repository.js";
import TweetRepository from "./repository/tweet-repository.js";
import LikeService from "./services/like-service.js";

// process.on("uncaughtException", (err) => {
//   console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
//   console.log(`Server shutting down due to Uncaught Exception`);

//   process.exit(1);
// });

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

  const tweetRepo = new TweetRepository();
  const tweets = await tweetRepo.getAll(0, 10);

  const userRepo = new UserRepository();
  const users = await userRepo.getAll();

  const likeService = new LikeService();
  await likeService.toggleLike(tweets[0].id, "Tweet", users[0].id);

  process.on("unhandledRejection", (err) => {
    console.log(`ErrorName: ${err.name}, Error: ${err.message}`);
    console.log(`Server shutting down due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
};

setupAndStart();
