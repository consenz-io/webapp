import { useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { section as sectionQuery } from 'utils/queries';
import {
  addSectionVersion as insertSectionVersionMutation,
  deleteComment as deleteCommentMutation,
} from 'utils/mutations';
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

interface SectionState {
  section?: Section;
  addVersion?: (variables: addVersionVars) => void;
  deleteComment?: (variables: delCommentsVars) => void;
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const [deleteComment] = useMutation(deleteCommentMutation, { refetchQueries: ['section'] });
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
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
