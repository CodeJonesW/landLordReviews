const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
  }
  type LandLord {
    _id: ID!
    firstName: String!
    lastName: String!
    addresses: [String]
  }

  type Review {
    description: String!
    landLordId: ID
    rating: Int
    address: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    findLandLordsByName(firstName: String!, lastName: String!): [LandLord]
    findReviewsByLandLordName(firstName: String!, lastName: String!): LandLord
    findReviewsByLandLordId(landLordId: ID!): [Review]
    findReviewsByAddress(address: String!): [Review]
    findLandLordByAddress(address: String!): [LandLord]
    findReviewsByLandLordFullName(
      firstName: String!
      lastName: String!
    ): [Review]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLandLord(
      description: String
      firstName: String!
      lastName: String!
      addresses: [String]
    ): LandLord
    saveReview(
      description: String!
      address: String
      landLordName: String
      rating: Int!
    ): Review
  }
`;

module.exports = typeDefs;
