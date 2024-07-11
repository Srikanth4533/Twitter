import { TweetRepository, HashtagRepository } from "../repository";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g);
    tags = tags.map((tag) => tag.substring(1));
    console.log(tags);
    const tweet = await this.tweetRepository.create(data);
    let alreadyPresentedTags = await this.hashtagRepository.findByName(tags);
    console.log(alreadyPresentedTags);
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
}

export default TweetService;

/**
 *  This is my #first #tweet. I am really #excited
 */
