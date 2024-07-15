import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async getWithComments(tweetId) {
    try {
      const tweet = await Tweet.findById(tweetId)
        .populate({
          path: "comments",
        })
        .lean();
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(offSet, limit) {
    try {
      const tweet = await Tweet.find().skip(offSet).limit(limit);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetRepository;
