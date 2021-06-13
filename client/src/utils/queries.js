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

export const FindReviewsByUser = gql`
  query findReviewsByUser($userId: String!) {
    findUserReviews(userId: $userId) {
      description
      address
      landLordId
    }
  }
`;
