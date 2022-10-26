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

export const agreementByIdQuery = gql`
  query agreementById($agreementId: Int!) {
    core_agreements(where: { id: { _eq: $agreementId } }) {
      id
      name
      updated_at
      category {
        name
      }
      rationale
      chapters(order_by: { index: asc }) {
        agreement_id
        name
        index
        sections(order_by: { index: asc }) {
          id
          index
          current_version {
            id
            content
          }
          versions(order_by: { created_at: asc }) {
            id
            content
            created_at
            upvotes
            downvotes
            my_vote
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

export const section = gql`
  query section($sectionId: Int!) {
    core_sections(where: { id: { _eq: $sectionId } }) {
      id
      current_version {
        id
      }
      versions(order_by: { created_at: asc }) {
        id
        content
        created_at
        upvotes
        downvotes
      }
    }
  }
`;
