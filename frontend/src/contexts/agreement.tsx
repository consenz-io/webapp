import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Agreement, Section, Version } from 'types';
import {
  insertVoteMutation,
  updateVoteMutation,
  deleteVoteMutation,
  updateAgreementMutation,
  updateChapterMutation,
} from 'utils/mutations';
import { agreementQuery } from 'utils/queries';
import { UserContext } from 'contexts/user';
import { addSectionMutation as insertSectionMutation } from 'utils/mutations';
import { JSONContent } from '@tiptap/react';
import { AuthContext } from './auth';
import { GroupContext } from './group';
import { Role } from 'types/entities';

export interface AddSectionVariables {
  chapterId: number;
  sectionIndex: number;
  versions: {
    content: JSONContent;
  };
}

interface AgreementContextState {
  agreementId: number;
  agreement: Agreement | undefined;
  rationale: string;
  agreementTitle: string;
  categoryName: string;
  canEditAgreement: boolean;
  vote: (version: Version, type: 'up' | 'down') => Promise<FetchResult<void>>;
  addSection: (content: JSONContent) => Promise<Section>;
  setCurrentChapterId: (currentChapterId: number) => void;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
  renameChapter: (chapterId: number, name: string) => Promise<FetchResult<void>>;
  updateAgreement: (agreement: Partial<Pick<Agreement, 'name' | 'rationale'>>) => void;
}

const AgreementContext = createContext<AgreementContextState>({} as AgreementContextState);

const AgreementProvider: FC = () => {
  const { agreementId } = useParams();
  const { user } = useContext(UserContext);
  const { jwt, loginWithRedirect, role } = useContext(AuthContext);
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

  const [renameChapter] = useMutation(updateChapterMutation, {
    refetchQueries: ['agreement'],
  });

  const [updateVote] = useMutation(updateVoteMutation, {
    refetchQueries: ['agreement'],
  });

  const [deleteVote] = useMutation(deleteVoteMutation, {
    refetchQueries: ['agreement'],
  });

  const [updateAgreement] = useMutation(updateAgreementMutation, {
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

  const state: AgreementContextState = {
    agreementId: agreement?.id || NaN,
    categoryName: agreement?.category?.name || '',
    canEditAgreement: agreement?.is_created_by_me || role === Role.MODERATOR,
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
    renameChapter: (id, name) => renameChapter({ variables: { id, name } }),
    updateAgreement: ({ name = agreement?.name, rationale = agreement?.rationale }) => {
      updateAgreement({
        variables: {
          id: agreementId,
          name,
          rationale,
        },
      });
    },
  };
  return (
    <AgreementContext.Provider value={state}>
      <Outlet />
    </AgreementContext.Provider>
  );
};

export { AgreementProvider, AgreementContext };
