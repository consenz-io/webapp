import { gql } from '@apollo/client';

export function agreementsQuery(categoryId?: string | number) {
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
      is_archived
      category {
        id
        name
      }
    }
  }
`;
}

export function getAgreementByIdQuery() {
  return gql`
    query getAgreement($agreementId: Int!) {
      core_agreements(where: { id: { _eq: $agreementId } }) {
        id
        name
        category {
          name
        }
        rationale
        chapters(order_by: { index: asc }) {
          agreement_id
          name
          index
          sections(order_by: { index: asc }) {
            index
            suggestions(order_by: { created_at: asc }) {
              id
              content
              upvotes
              downvotes
            }
          }
        }
        group {
          name
          slug
        }
      }
    }
  `;
}
