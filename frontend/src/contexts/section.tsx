import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { createContext, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import {
  addSectionVersion as insertSectionVersionMutation,
  deleteComment as deleteCommentMutation,
} from 'utils/mutations';
import { section as sectionQuery, getComments } from 'utils/queries';
import { JSONContent } from '@tiptap/react';

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
export interface addCommentVars {
  variables: {
    section_version_id: number;
  };
}

interface SectionState {
  section?: Section;
  addVersion?: (variables: addVersionVars) => void;
  deleteComment?: (variables: delCommentsVars) => void;
  addComment?: (variables: addCommentVars) => unknown;
  comments?: { core_comments: any[] };
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const [deleteComment] = useMutation(deleteCommentMutation, {
    refetchQueries: ['section', 'getComments'],
  });
  const [addComment, { data: comments }] = useLazyQuery(getComments);
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
    addComment: (variables: addCommentVars) => {
      addComment(variables);
      return comments;
    },
    comments,
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
