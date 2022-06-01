import React, { useState, Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUser {
    users(where: { name: { _eq: yishai } }) {
      id
      role
      name
      is_auth
    }
  }
`;

const UsersPrivateList = (props: any) => {
  return <h1>Users</h1>;
};

const UsersPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error("error", error);
    return <div>Error!</div>;
  }
  console.log("users ", data);

  return <UsersPrivateList users={data.users} />;
};

export default UsersPrivateListQuery;
