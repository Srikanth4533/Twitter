const Hashtag = require("../models/hashtags");

class HashtagRepository {
  async create(data) {
    try {
      const hashtag = await Hashtag.create(data);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(data) {
    try {
      const hashtags = await Hashtag.insertMany(data);
      console.log(hashtags);
    } catch (error) {
      console.log(error);
    }
  }

  async get(hashtagId) {
    try {
      const hashtag = await Hashtag.findById(hashtagId);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async getWithComments(hashtagId) {
    try {
      const hashtag = await Hashtag.findById(hashtagId)
        .populate({
          path: "comments",
        })
        .lean();
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async update(hashtagId, data) {
    try {
      const hashtag = await Hashtag.findByIdAndUpdate(hashtagId, data, {
        new: true,
      });
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(hashtagId) {
    try {
      const hashtag = await Hashtag.findByIdAndDelete(hashtagId);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HashtagRepository;
