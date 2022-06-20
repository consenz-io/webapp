import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useEffect } from "react";
const GET_USERS = gql`
  query GetUsers {
    users {
      createdAt
      email
      id
    }
  }
`;

const INSERT_USER = gql`
  mutation InsertUser {
    insert_users_one(object: { email: "test3@test", createdAt: "2022-06-20" }) {
      email
      id
    }
  }
`;
function createUser(e: any) {
  e.preventDefault();
  console.log("create user");
}
const Query = function () {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (data) {
    console.log("data", data);
  }
  return (
    <div>
      <h1>Query</h1>
      <main>
        <h2>data</h2>
        <main>
          {data.users.map((user: any) => {
            return <div key={user.id}>Email: {user.email}</div>;
          })}
        </main>
        <form action="">
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="createdAt">Create At</label>
            <input type="date" name="createdAt" id="createdAt" />
            <button onClick={createUser}>create user</button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default Query;
