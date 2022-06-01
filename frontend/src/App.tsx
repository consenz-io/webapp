import React, { useState } from "react";
import "./App.css";
import Query from "./Query/Query";
import { Link, Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://hasura-try-yishain11.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": `tp2P42WhPSwWu4l6gy5aP8cdTVfMBTaN40Joi6PENFxx4H5QM09Hw4Rxnl8GVYGd`,
        "Content-Type": "application/json",
      },
    }),
    cache: new InMemoryCache(),
  });
};
function App() {
  const [client] = useState(createApolloClient());

  return (
    <div className="container">
      <nav>
        <Link to="private">Private</Link> | <Link to="home">Home</Link> |{" "}
        <Link to="login">Login</Link>
      </nav>
      <Outlet />
      <ApolloProvider client={client}>
        <div>
          <h3>apolo</h3>
          <Query />
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
