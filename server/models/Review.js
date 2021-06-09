const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
