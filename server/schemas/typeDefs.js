const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
  }
  type LandLord {
    landLordId: ID!
    description: String
    firstName: String!
    lastName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLandLord(
      description: String
      firstName: String!
      lastName: String!
    ): User
  }
`;

module.exports = typeDefs;
