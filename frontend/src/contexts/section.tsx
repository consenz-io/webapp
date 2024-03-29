import { useMutation, useQuery, useLazyQuery, FetchResult } from '@apollo/client';
import { createContext, FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { sectionQuery, commentsQuery } from 'utils/queries';
import {
  addCommentMutation,
  addSectionVersionMutation,
  deleteCommentMutation,
  deleteSectionVersionMutation,
} from 'utils/mutations';
import { JSONContent } from '@tiptap/react';
import { Comment, Version } from 'types/entities';

export interface addVersionVars {
  variables: {
    content: JSONContent;
    sectionId: number;
  };
}
export interface AddCommentVars {
  variables: {
    content: string;
    sectionVersionId: number;
  };
}
export interface fetchCommentsVars {
  variables: {
    section_version_id: number;
  };
}

interface SectionState {
  section?: Section;
  deleteComment: (commentId: number) => void;
  deleteSectionVersion: (sectionVersionId: number) => Promise<FetchResult>;
  addVersion: (content: JSONContent) => Promise<Version>;
  addComment: (content: string, versionId: number) => void;
  fetchComments: (sectionVersionId: number) => unknown;
  comments?: Comment[];
}

const SectionContext = createContext<SectionState>({} as SectionState);

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(addSectionVersionMutation, { refetchQueries: ['section'] });
  const [deleteComment] = useMutation(deleteCommentMutation, {
    refetchQueries: ['section', 'comments'],
  });
  const [deleteSectionVersion] = useMutation(deleteSectionVersionMutation, {
    refetchQueries: ['section', 'comments'],
  });
  const [addComment] = useMutation(addCommentMutation);
  const [fetchComments, { data: comments }] = useLazyQuery(commentsQuery);
  const { sectionId } = useParams();
  const { data, startPolling, stopPolling } = useQuery<{
    core_sections: Section[];
  }>(sectionQuery, {
    variables: {
      sectionId,
    },
  });

  useEffect(() => {
    startPolling(5000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  const state: SectionState = {
    section: data?.core_sections[0],
    deleteComment: (commentId: number) => {
      deleteComment({
        variables: {
          id: commentId,
        },
      });
    },
    deleteSectionVersion: (sectionVersionId: number) =>
      deleteSectionVersion({
        variables: {
          id: sectionVersionId,
        },
      }),
    addVersion: useCallback(
      async (content: JSONContent) => {
        const { data } = await addVersion({ variables: { content, sectionId: Number(sectionId) } });
        return data?.insert_core_section_versions_one;
      },
      [addVersion, sectionId]
    ),
    addComment: useCallback(
      (content: string, sectionVersionId: number) => {
        addComment({
          variables: {
            content,
            sectionVersionId,
          },
          refetchQueries: ['comments'],
        });
      },
      [addComment]
    ),
    fetchComments: useCallback(
      (sectionVersionId: number) => {
        fetchComments({
          variables: {
            section_version_id: sectionVersionId,
          },
        });
        return comments;
      },
      [fetchComments, comments]
    ),
    comments: comments?.core_comments,
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
