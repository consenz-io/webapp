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
        chapters {
          agreement_id
          name
          sections {
            versions {
              content
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
