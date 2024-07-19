import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";

jest.mock("../../src/models/tweet.js");

describe("Create tweet tests", () => {
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

  test("should not create a tweet and throw exception", async () => {
    const data = {
      content: "Testing tweet",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Something went wrong");
    });
  });
});

describe("Get all tweet tests", () => {
  test("testing limit for get all", async () => {
    const data = {
      content: "Testing tweet content",
    };
    const tweetsArray = [
      { ...data, createdAt: "2024-07-18", updatedAt: "2024-07-18" },
      { ...data, createdAt: "2024-07-18", updatedAt: "2024-07-18" },
      { ...data, createdAt: "2024-07-18", updatedAt: "2024-07-18" },
    ];
    const findResponse = { tweetsArray };
    findResponse.limit = jest.fn((limit) =>
      findResponse.tweetsArray.slice(0, limit)
    );
    findResponse.skip = jest.fn((offset) => findResponse);
    const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
      return findResponse;
    });
    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getAll(0, 3);
    expect(spy).toHaveBeenCalled();
    expect(tweets).toHaveLength(3);
  });
});
