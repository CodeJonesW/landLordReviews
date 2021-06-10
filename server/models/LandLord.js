const { Schema, model } = require("mongoose");

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
