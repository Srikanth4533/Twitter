import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";

jest.mock("../../src/models/tweet.js");

test("should create a new tweet and return it", async () => {
  const data = {
    content: "Testing tweet",
  };

  const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
    return { ...data, createdAt: "2024-07-17", updatedAt: "2024-07-17" };
  });

  const tweetRepository = new TweetRepository();
  const tweet = await tweetRepository.create(data);

  expect(spy).toHaveBeenCalled();
  expect(tweet.content).toBe(data.content);
  expect(tweet.createdAt).toBeDefined();
});
