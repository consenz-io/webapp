import { gql } from '@apollo/client';

export const agreementsQuery = gql`
  query agreements($groupId: Int!, $isArchived: Boolean!) {
    core_agreements(where: { group_id: { _eq: $groupId }, is_archived: { _eq: $isArchived } }) {
      id
      name
      rationale
      category {
        id
        name
      }
    }
  }
`;
