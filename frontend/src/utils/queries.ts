import { gql } from '@apollo/client';

export const agreementsQuery = (categoryId?: string) => gql`
  query agreements($groupId: Int!, $isArchived: Boolean!, $categoryId: Int) {
    core_agreements(
      where: {
        group_id: { _eq: $groupId }
        is_archived: { _eq: $isArchived }
        ${categoryId ? 'category_id: { _eq: $categoryId }' : ''}
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
