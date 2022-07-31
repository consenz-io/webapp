import { gql } from '@apollo/client';

export function agreementsQuery(categoryId?: string) {
  let categoryExpression = '';
  if (categoryId) {
    categoryExpression = Number(categoryId)
      ? 'category_id: { _eq: $categoryId }'
      : 'category_id: { _is_null: true }';
  }

  return gql`
    query agreements($groupId: Int!, $isArchived: Boolean!, $categoryId: Int) {
      core_agreements(
        where: {
          group_id: { _eq: $groupId }
          is_archived: { _eq: $isArchived }
          ${categoryExpression}
        }
      ) {
        id
        name
        rationale
        updated_at
        category {
          id
          name
        }
      }
    }
  `;
}

export const agreementDetailsQuery = gql`
  query agreement($id: Int!) {
    core_agreements(where: { id: { _eq: $id } }) {
      id
      name
      rationale
      updated_at
      category_id
      category {
        id
        name
      }
      topics(order_by: { index: asc }) {
        id
        index
        name
        sections(order_by: { index: asc }) {
          id
          index
          content
        }
      }
    }
  }
`;

// Mutation to insert new agreement record
export const addAgreementMutation = gql`
  mutation AddAgreement($category_id: Int!, $group_id: Int!, $name: String!, $rationale: String!) {
    insert_core_agreements_one(
      object: { category_id: $category_id, group_id: $group_id, name: $name, rationale: $rationale }
    ) {
      id
      category_id
      group_id
      name
      rationale
    }
  }
`;

// Mutation to update agreement record
export const updateAgreementMutation = gql`
  mutation UpdateAgreement($id: Int!, $category_id: Int!, $name: String!, $rationale: String!) {
    update_core_agreements_by_pk(
      pk_columns: { id: $id }
      _set: { category_id: $category_id, name: $name, rationale: $rationale }
    ) {
      id
      category_id
      group_id
      name
      rationale
    }
  }
`;
