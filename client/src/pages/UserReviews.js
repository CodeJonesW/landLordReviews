import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME, QUERY_REVIEWS_BY_USER } from "../utils/queries";

const UserReviews = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div id="userReviewsTitleDiv">
        <h1>User Reviews</h1>
        <h2>By:{userData.username}</h2>
      </div>
    </>
  );
};

export default UserReviews;
