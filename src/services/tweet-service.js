const { TweetRepository, HashtagRepository } = require("../repository");

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
    alreadyPresentedTags = alreadyPresentedTags.map((tags) => tags.title);
    let newTags = tags.filter((tag) => !alreadyPresentedTags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    const response = await this.hashtagRepository.bulkCreate(newTags);
    console.log(response);

    // [excited, coding, js, career] -> [{title: excited}, {title: career}]
    // todo create hashtags and add here
    return tweet;
  }
}

module.exports = TweetService;

/**
 *  This is my #first #tweet. I am really #excited
 */
