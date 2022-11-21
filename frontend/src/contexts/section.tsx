import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { createContext, FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { section as sectionQuery, getComments } from 'utils/queries';
import { addSectionVersion as insertSectionVersionMutation } from 'utils/mutations';
import { JSONContent } from '@tiptap/react';

export interface addVersionVars {
  variables: {
    content: JSONContent;
    sectionId: number;
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
  fetchComments?: (sectionVersionId: number) => unknown;
  comments?: { core_comments: any[] };
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const [fetchComments, { data: comments }] = useLazyQuery(getComments);
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
    comments,
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
