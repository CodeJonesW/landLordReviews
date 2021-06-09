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
    findLandLords: async (parent, args, context) => {
      if (context.user) {
        const landLordsData = await LandLord.find({
          firstName: "bill",
          lastName: "sally",
        });
        return landLordsData;
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
        console.log(parent, "parent is undefined");
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
    saveReview: async (parent, { description, landLordId }, context) => {
      if (context.user) {
        console.log(landLordId);
        const newReview = await Review.create({ description, landLordId });
        console.log(newReview);
        return newReview;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
