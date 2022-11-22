import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { createContext, FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { section as sectionQuery, comments as commentsQuery } from 'utils/queries';
import {
  addComment as addCommentMutation,
  addSectionVersion as insertSectionVersionMutation,
  deleteComment as deleteCommentMutation,
  deleteSectionVersion as deleteSVtMutation,
} from 'utils/mutations';
import { JSONContent } from '@tiptap/react';
import { Comment } from 'types/entities';

export interface addVersionVars {
  variables: {
    content: JSONContent;
    sectionId: number;
  };
}

export interface delCommentsVars {
  variables: {
    id: number;
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
  addVersion?: (variables: addVersionVars) => void;
  deleteComment?: (variables: delCommentsVars) => void;
  deleteSectionVersion?: (variables: delCommentsVars) => void;
  addComment?: (content: string, versionId: number) => void;
  fetchComments?: (sectionVersionId: number) => unknown;
  comments?: Comment[];
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const [deleteComment] = useMutation(deleteCommentMutation, {
    refetchQueries: ['section', 'getComments'],
  });
  const [deleteSectionVersion] = useMutation(deleteSVtMutation, {
    refetchQueries: ['section', 'getComments'],
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
    addVersion,
    deleteComment,
    deleteSectionVersion,
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
