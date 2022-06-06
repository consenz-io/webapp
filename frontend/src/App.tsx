import "./App.css";
import { useState } from "react";
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
        "x-hasura-admin-secret": ``,
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
      <Outlet />
    </div>
  );
}

export default App;
