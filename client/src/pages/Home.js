import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {userData.username
        ? `<h1>Welcome ${userData.username}</h1>`
        : ` <h1>Please log in</h1>`}
    </>
  );
};

export default Home;
