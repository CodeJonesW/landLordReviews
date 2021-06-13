import gql from "graphql-tag";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_REVIEWS_BY_USER = gql`
  {
    findReviewsByUser(userId: "60c00da5a9fc9fb4e443de19") {
      description
      address
      landLordId
    }
  }
`;
