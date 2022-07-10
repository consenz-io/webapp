import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const headers = new Headers();
headers.append("x-hasura-admin-secret", process.env.REACT_APP_SECRET_HASURA);

const graphQLClient = new GraphQLClient(process.env.REACT_APP_API_URL, {
  headers
});

export const useGetUser = (email: string) => {
  return useQuery(["get-user", email], async () => {
    return await graphQLClient.request(
      gql`
        query getUser($email: String) {
          core_users(where: {email: {_eq: $email}}) {
            user_groups {
              id
            }
          }
        }
      `,
      { email }
    );
  });
};
