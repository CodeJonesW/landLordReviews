const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  landLordId: {
    type: String,
    required: false,
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
  address: {
    type: String,
    required: false,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
