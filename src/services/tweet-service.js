import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.content;
    let tags = content
      .match(/#[a-zA-Z0-9_]+/g)
      .map((tag) => tag.substring(1).toLowerCase());
    const tweet = await this.tweetRepository.create(data);
    let alreadyPresentedTags = await this.hashtagRepository.findByName(tags);
    let titleOfPresentTags = alreadyPresentedTags.map((tags) => tags.title);
    let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresentedTags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });

    // [excited, coding, js, career] -> [{title: excited}, {title: career}]
    // todo create hashtags and add here
    return tweet;
  }

  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComments(tweetId);
    return tweet;
  }
}

export default TweetService;

/**
 *  This is my #first #tweet. I am really #excited
 */
