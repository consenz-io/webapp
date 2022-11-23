import { gql } from '@apollo/client';

export const addSection = gql`
  mutation AddSection(
    $chapterId: Int!
    $sectionIndex: Int!
    $versions: [core_section_versions_insert_input!]!
  ) {
    insert_core_sections_one(
      object: { chapter_id: $chapterId, index: $sectionIndex, versions: { data: $versions } }
    ) {
      id
      versions {
        id
      }
    }
  }
`;

export const addAgreement = gql`
  mutation addAgreement(
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
      chapters {
        id
        sections {
          versions {
            id
          }
        }
      }
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

export const insertVote = gql`
  mutation insertVote($userId: Int!, $versionId: Int!, $type: String!) {
    insert_core_votes(objects: { user_id: $userId, version_id: $versionId, type: $type }) {
      returning {
        user_id
        version_id
        type
      }
    }
  }
`;

export const updateVote = gql`
  mutation updateVote($userId: Int!, $versionId: Int!, $type: String!) {
    update_core_votes_by_pk(
      pk_columns: { user_id: $userId, version_id: $versionId }
      _set: { type: $type }
    ) {
      type
    }
  }
`;

export const deleteVote = gql`
  mutation deleteVote($userId: Int!, $versionId: Int!) {
    delete_core_votes_by_pk(user_id: $userId, version_id: $versionId) {
      type
    }
  }
`;

export const addSectionVersion = gql`
  mutation AddSectionVersion($sectionId: Int!, $content: json!) {
    insert_core_section_versions_one(object: { section_id: $sectionId, content: $content }) {
      id
    }
  }
`;

export const deleteComment = gql`
  mutation deleteComment($id: Int!) {
    delete_core_comments(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const deleteSectionVersion = gql`
  mutation deleteSectionVersion($id: Int!) {
    delete_core_section_versions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
export const addComment = gql`
  mutation addComment($content: String!, $sectionVersionId: Int!) {
    insert_core_comments_one(object: { content: $content, section_version_id: $sectionVersionId }) {
      id
    }
  }
`;
