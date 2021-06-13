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
      // this is a public route
      const landLordsData = await LandLord.find({
        firstName: cleanInput(firstName),
        lastName: cleanInput(lastName),
      });
      // console.log(landLordsData);
      return landLordsData;
    },
    findLandLordByAddress: async (parent, { address }, context) => {
      // this is a public route
      const cleanAddress = address.toLowerCase().trim();
      const landLordsData = await LandLord.find({
        addresses: { $in: [cleanAddress] },
      });
      return landLordsData;
    },
    findReviewsByLandLordName: async (
      parent,
      { firstName, lastName },
      context
    ) => {
      // this is a public route
      const landLordsData = await LandLord.find({
        firstName: cleanInput(firstName),
        lastName: cleanInput(lastName),
      });

      const landLordReviewsData = await Review.find({
        landLordId: landLordsData._id,
      });
      return landLordReviewsData;
    },
    findReviewsByLandLordFullName: async (
      parent,
      { firstName, lastName },
      context
    ) => {
      if (context.user) {
        // this is a public route
        const landLordReviewsData = await LandLord.find({
          firstName,
          lastName,
        });
        const reviewsData = await Review.find({
          landLordId: landLordReviewsData._id,
        });
        return reviewsData;
      }
      throw new AuthenticationError("Not logged in");
    },
    findReviewsByAddress: async (parent, { address }, context) => {
      // this is a public route
      const cleanAddress = address.toLowerCase().trim();
      // if (context.user) {
      const reviewsData = await Review.find({
        address: cleanAddress,
      });
      return reviewsData;
      // }
      // throw new AuthenticationError("Not logged in");
    },
    findReviewsByUser: async (parent, { userId }, context) => {
      if (context.user) {
        const reviewsData = await Review.find({
          userId: userId,
        });
        console.log(reviewsData);
        return reviewsData;
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
      { firstName, lastName, addresses },
      context
    ) => {
      if (context.user) {
        // console.log(parent, "parent is undefined");
        const cleanAddresses = addresses.map((address) => cleanInput(address));
        const newLandLord = await LandLord.create({
          firstName: cleanInput(firstName),
          lastName: cleanInput(lastName),
          addresses: [...cleanAddresses],
        });
        // console.log(newLandLord);
        return newLandLord;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    saveReview: async (
      parent,
      { description, landLordName, rating, address, userId },
      context
    ) => {
      if (context.user) {
        const newReview = await Review.create({
          description,
          landLordName: cleanInput(landLordName),
          rating,
          address,
          userId,
        });
        // console.log(newReview);
        return newReview;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

function cleanInput(string) {
  return string.toLowerCase().trim();
}

module.exports = resolvers;
