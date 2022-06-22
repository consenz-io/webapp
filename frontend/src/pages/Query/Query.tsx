import { DocumentNode, useMutation, useQuery } from "@apollo/client";
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

const createUserMut = gql`
  mutation insert_user($email: String!, $createdAt: Date!) {
    insert_users_one(object: { email: $email, createdAt: $createdAt }) {
      email
      id
      createdAt
    }
  }
`;
function CreateUser(e: any) {
  console.log("start createUser");
  e.preventDefault();
  console.log("create user");
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email")?.toString();
  const createdAt = formData.get("createdAt")?.toString();
  const { loading, error, data } = useQuery(createUserMut, {
    variables: { email, createdAt },
  });
  return <></>;
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
      <nav>
        <a href="/">home</a>
        <a href="/login">login</a>
      </nav>
      <h1>Query</h1>
      <main>
        <h2>data</h2>
        <main>
          {data.users.map((user: any) => {
            return <div key={user.id}>Email: {user.email}</div>;
          })}
        </main>
        <form action="" onSubmit={CreateUser}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="createdAt">Create At</label>
            <input type="date" name="createdAt" id="createdAt" />
            <button type="submit">create user</button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default Query;
