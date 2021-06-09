const {
  AuthenticationError,
  attachConnectorsToContext,
} = require("apollo-server-express");
const { User, LandLord } = require("../models");
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
        const newLandLord = await LandLord.create(
          { description, firstName, lastName, addresses },
          function (err, small) {
            if (err) return handleError(err);
            // saved!
          }
        );
        return newLandLord;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
