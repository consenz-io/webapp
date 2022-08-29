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
  mutation DeleteAgreement($agreementName: String!) {
    delete_core_agreements(where: { name: { _eq: $agreementName } }) {
      affected_rows
    }
  }
`;
