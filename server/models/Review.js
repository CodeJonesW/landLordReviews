const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  landLordId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: [1, "Rating must be between 1 and 10"],
    max: [10, "Rating must be between 1 and 10"],
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
