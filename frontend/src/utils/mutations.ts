import { gql } from '@apollo/client';

export const addAgreement = gql`
  mutation AddAgreement(
    $categoryId: Int
    $groupId: Int!
    $name: String!
    $rationale: String!
    $chapters: [core_chapters_insert_input!]!
  ) {
    insert_core_agreements_one(
      object: {
        category_id: $categoryId
        group_id: $groupId
        name: $name
        rationale: $rationale
        chapters: { data: $chapters }
      }
    ) {
      id
      category_id
      group_id
      name
      rationale
    }
  }
`;

export const addCategoryMutation = gql`
  mutation AddCategory($name: String!, $group_id: Int!) {
    insert_core_categories_one(object: { name: $name, group_id: $group_id }) {
      id
      name
      group_id
    }
  }
`;

export const deleteAgreementMutation = gql`
  mutation DeleteAgreement($id: Int!) {
    delete_core_agreements(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const voteMutation = gql`
  mutation Vote($user_id: Int!, $version_id: Int!, $type: String!) {
    insert_core_votes(objects: { user_id: $user_id, version_id: $version_id, type: $type }) {
      returning {
        user_id
        version_id
        type
      }
    }
  }
`;
