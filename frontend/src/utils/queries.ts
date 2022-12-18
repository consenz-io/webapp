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

export const agreementQuery = gql`
  query agreement($agreementId: Int!) {
    core_agreements(where: { id: { _eq: $agreementId } }) {
      id
      name
      updated_at
      category {
        name
      }
      rationale
      chapters(order_by: { index: asc }) {
        id
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
            downvotes
            my_vote
            threshold
            upvotes
            comment_count
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

export const sectionQuery = gql`
  query section($sectionId: Int!) {
    core_sections(where: { id: { _eq: $sectionId } }) {
      id
      index
      current_version {
        id
      }
      versions(order_by: { created_at: asc }) {
        id
        content
        created_at
        downvotes
        my_vote
        threshold
        upvotes
        author {
          full_name
          id
        }
      }
    }
  }
`;

export const commentsQuery = gql`
  query comments($section_version_id: Int!) {
    core_comments(
      where: { section_version_id: { _eq: $section_version_id } }
      order_by: { created_at: asc }
    ) {
      id
      author {
        id
        full_name
      }
      created_at
      content
    }
  }
`;

export const groupsQuery = gql`
  query groups($slug: String!) {
    core_groups(where: { slug: { _eq: $slug } }) {
      id
      name
      slug
      created_at
      language
    }
  }
`;
