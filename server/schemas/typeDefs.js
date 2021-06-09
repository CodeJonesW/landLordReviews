const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
  }
  type LandLord {
    _id: ID!
    description: String
    firstName: String!
    lastName: String!
    addresses: [String]
  }

  type Review {
    description: String!
    landLordId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    findLandLords: [LandLord]
    findReviewsByLandLordId(landLordId: ID!): [Review]
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
    saveReview(description: String!, landLordId: ID!): Review
  }
`;

module.exports = typeDefs;
