const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const landLordSchema = new Schema({
  addresses: [
    {
      type: String,
    },
  ],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  faceBooklink: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const LandLord = model("LandLord", landLordSchema);

module.exports = LandLord;
