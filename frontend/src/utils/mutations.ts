import { gql } from '@apollo/client';

export const addSectionMutation = gql`
  mutation addSection(
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

export const addAgreementMutation = gql`
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

export const insertVoteMutation = gql`
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

export const updateVoteMutation = gql`
  mutation updateVote($userId: Int!, $versionId: Int!, $type: String!) {
    update_core_votes_by_pk(
      pk_columns: { user_id: $userId, version_id: $versionId }
      _set: { type: $type }
    ) {
      type
    }
  }
`;

export const deleteVoteMutation = gql`
  mutation deleteVote($userId: Int!, $versionId: Int!) {
    delete_core_votes_by_pk(user_id: $userId, version_id: $versionId) {
      type
    }
  }
`;

export const addSectionVersionMutation = gql`
  mutation AddSectionVersion($sectionId: Int!, $content: json!) {
    insert_core_section_versions_one(object: { section_id: $sectionId, content: $content }) {
      id
    }
  }
`;

export const deleteCommentMutation = gql`
  mutation deleteComment($id: Int!) {
    delete_core_comments(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const deleteSectionVersionMutation = gql`
  mutation deleteSectionVersion($id: Int!) {
    delete_core_section_versions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
export const addCommentMutation = gql`
  mutation addComment($content: String!, $sectionVersionId: Int!) {
    insert_core_comments_one(object: { content: $content, section_version_id: $sectionVersionId }) {
      id
    }
  }
`;

export const updateAgreementMutation = gql`
  mutation updateAgreement($id: Int!, $name: String, $rationale: String) {
    update_core_agreements_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, rationale: $rationale }
    ) {
      id
      name
      rationale
    }
  }
`;

export const updateChapterMutation = gql`
  mutation updateChapter($id: Int!, $name: String) {
    update_core_chapters_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
    }
  }
`;
