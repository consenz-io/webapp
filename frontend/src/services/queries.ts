import { gql } from "@apollo/client";

export const userQuery = gql`
  query Q1 {
    core_users {
      email
      id
      user_groups {
        group {
          name
        }
      }
    }
  }
`;
