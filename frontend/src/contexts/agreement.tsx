import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Agreement, Section, Version } from 'types';
import { insertVoteMutation, updateVoteMutation, deleteVoteMutation } from 'utils/mutations';
import { agreementQuery } from 'utils/queries';
import { UserContext } from 'contexts/user';
import { addSectionMutation as insertSectionMutation } from 'utils/mutations';
import { JSONContent } from '@tiptap/react';
import { AuthContext } from './auth';
import { GroupContext } from './group';

export interface AddSectionVariables {
  chapterId: number;
  sectionIndex: number;
  versions: {
    content: JSONContent;
  };
}

interface IAgreementContext {
  agreementId: number;
  agreement: Agreement | undefined;
  rationale: string;
  agreementTitle: string;
  categoryName: string;
  vote: (version: Version, type: 'up' | 'down') => Promise<FetchResult<void>>;
  addSection: (content: JSONContent) => Promise<Section>;
  setCurrentChapterId: (currentChapterId: number) => void;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
}

const AgreementContext = createContext<IAgreementContext>({} as IAgreementContext);

const AgreementProvider: FC = () => {
  const { agreementId } = useParams();
  const { user } = useContext(UserContext);
  const { jwt, loginWithRedirect } = useContext(AuthContext);
  const { id: groupId } = useContext(GroupContext);
  const userId = user?.id;
  const [currentChapterId, setCurrentChapterId] = useState<number>(-1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(-1);
  const { data, startPolling, stopPolling } = useQuery<{
    core_agreements: Agreement[];
  }>(agreementQuery, {
    variables: {
      agreementId,
    },
  });
  useEffect(() => {
    startPolling(5000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  const agreement = data?.core_agreements[0];
  const [addSection] = useMutation(insertSectionMutation, {
    refetchQueries: ['section', 'agreement'],
    awaitRefetchQueries: true,
  });
  const [insertVote] = useMutation(insertVoteMutation, {
    refetchQueries: ['agreement'],
  });

  const [updateVote] = useMutation(updateVoteMutation, {
    refetchQueries: ['agreement'],
  });

  const [deleteVote] = useMutation(deleteVoteMutation, {
    refetchQueries: ['agreement'],
  });

  async function vote(version: Version, type: 'up' | 'down') {
    if (!jwt) {
      loginWithRedirect({
        redirectTo: window.location.pathname,
        joinGroupId: groupId,
      });
    }
    if (!version.my_vote) {
      return insertVote({
        variables: {
          userId,
          versionId: version.id,
          type,
        },
      });
    }
    if (version?.my_vote === type) {
      return deleteVote({
        variables: {
          userId,
          versionId: version.id,
        },
      });
    }
    return updateVote({
      variables: {
        userId,
        versionId: version.id,
        type,
      },
    });
  }

  const state: IAgreementContext = {
    agreementId: agreement?.id || NaN,
    categoryName: agreement?.category?.name || '',
    rationale: agreement?.rationale || '',
    agreementTitle: agreement?.name || '',
    agreement: agreement,
    vote,
    addSection: useCallback(
      async (content: JSONContent) => {
        const { data } = await addSection({
          variables: {
            chapterId: currentChapterId,
            sectionIndex: currentSectionIndex,
            versions: { content },
          },
        });
        return data?.insert_core_sections_one;
      },
      [addSection, currentChapterId, currentSectionIndex]
    ),
    setCurrentChapterId,
    setCurrentSectionIndex,
  };
  return (
    <AgreementContext.Provider value={state}>
      <Outlet />
    </AgreementContext.Provider>
  );
};

export { AgreementProvider, AgreementContext };
