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
  query agreementDetails($id: Int!) {
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
          topic_id
          index
          suggestions(order_by: { created_at: asc }) {
            id
            section_id
            content
          }
        }
      }
    }
  }
`;

export const agreementTopicsSectionsSuggestionsQuery = gql`
  query agreementTopicsSectionsSuggestions($agreement_id: Int!) {
    core_topics(where: { agreement_id: { _eq: $agreement_id } }, order_by: { index: asc }) {
      id
      index
      name
      sections(order_by: { index: asc }) {
        id
        agreement_id
        topic_id
        index
        suggestions(order_by: { created_at: asc }) {
          id
          section_id
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

// Mutation to insert new topic record
export const addTopicMutation = gql`
  mutation AddTopic($agreement_id: Int!, $index: Int!, $name: String!) {
    insert_core_topics_one(object: { agreement_id: $agreement_id, index: $index, name: $name }) {
      id
      agreement_id
      index
      name
    }
  }
`;

// Mutation to update topic record
export const updateTopicMutation = gql`
  mutation UpdateTopic($id: Int!, $name: String!) {
    update_core_topics_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      agreement_id
      index
      name
    }
  }
`;

// Mutation to delete topic record
export const deleteTopicMutation = gql`
  mutation DeleteTopic($id: Int!, $agreement_id: Int!, $index: Int!) {
    delete_core_topics_by_pk(id: $id) {
      id
      agreement_id
      created_at
      index
      name
      updated_at
    }
    update_core_topics(
      where: { agreement_id: { _eq: $agreement_id }, index: { _gt: $index } }
      _inc: { index: -1 }
    ) {
      returning {
        id
        index
        agreement_id
      }
      affected_rows
    }
  }
`;

// Mutation to insert new section record
// Note: first we increment index on any later sections in the same agreement
export const addSectionMutation = gql`
  mutation AddSection($agreement_id: Int!, $topic_id: Int!, $index: Int!) {
    update_core_sections(
      where: { index: { _gte: $index }, agreement_id: { _eq: $agreement_id } }
      _inc: { index: 1 }
    ) {
      returning {
        id
        index
        agreement_id
        topic_id
      }
      affected_rows
    }
    insert_core_sections_one(
      object: { agreement_id: $agreement_id, topic_id: $topic_id, index: $index }
    ) {
      id
      agreement_id
      index
    }
  }
`;

// Mutation to delete section record
export const deleteSectionMutation = gql`
  mutation DeleteSection($id: Int!, $agreement_id: Int!, $index: Int!) {
    delete_core_suggestions(where: { section_id: { _eq: $id } }) {
      returning {
        id
        section_id
        content
        created_at
        updated_at
      }
      affected_rows
    }
    delete_core_sections_by_pk(id: $id) {
      id
      agreement_id
      topic_id
      index
      created_at
      updated_at
    }
    update_core_sections(
      where: { agreement_id: { _eq: $agreement_id }, index: { _gt: $index } }
      _inc: { index: -1 }
    ) {
      returning {
        id
        index
        agreement_id
      }
      affected_rows
    }
  }
`;

// Mutation to insert new section record
export const addSuggestionMutation = gql`
  mutation AddSuggestion($section_id: Int!, $content: String!) {
    insert_core_suggestions_one(object: { section_id: $section_id, content: $content }) {
      id
      section_id
      content
    }
  }
`;

// Mutation to update suggestion record
export const updateSuggestionMutation = gql`
  mutation UpdateSuggestion($id: Int!, $content: String!) {
    update_core_suggestions_by_pk(pk_columns: { id: $id }, _set: { content: $content }) {
      id
      section_id
      content
      created_at
      updated_at
    }
  }
`;
