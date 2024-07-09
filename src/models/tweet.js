const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtuals
tweetSchema.virtual("contentWithEmail").get(function process() {
  return `${this.content} \nCreated by: ${this.userEmail}`;
});

// Hooks
tweetSchema.pre("save", function (next) {
  this.content = this.content + ".....!";
  next();
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
