const {
  AuthenticationError,
  attachConnectorsToContext,
} = require("apollo-server-express");
const { User, LandLord, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    findLandLordsByName: async (parent, { firstName, lastName }, context) => {
      // this is a public route so we are not checking auth via context.user.
      const landLordsData = await LandLord.find({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      });
      return landLordsData;
    },
    findLandLordById: async (parent, { landLordId }, context) => {
      if (context.user) {
        const landLordReviewsData = await LandLord.findOne({
          _id: landLordId,
        });
        return landLordReviewsData;
      }
      throw new AuthenticationError("Not logged in");
    },
    findLandLordByAddress: async (parent, { address }, context) => {
      const landLordsData = await LandLord.find({
        addresses: { $in: ["my address"] },
      });
      return landLordsData;
    },
    findReviewsByLandLordId: async (parent, { landLordId }, context) => {
      if (context.user) {
        const landLordReviewsData = await Review.find({
          landLordId: landLordId,
        });
        return landLordReviewsData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveLandLord: async (
      parent,
      { description, firstName, lastName, addresses },
      context
    ) => {
      if (context.user) {
        // console.log(parent, "parent is undefined");
        const newLandLord = await LandLord.create({
          description,
          firstName,
          lastName,
          addresses,
        });
        console.log(newLandLord);
        return newLandLord;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    saveReview: async (
      parent,
      { description, landLordId, rating },
      context
    ) => {
      if (context.user) {
        console.log(landLordId);
        const newReview = await Review.create({
          description,
          landLordId,
          rating,
        });
        console.log(newReview);
        return newReview;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
