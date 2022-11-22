import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useContext, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Agreement, Version } from 'types';
import {
  insertVote as insertVoteMutation,
  updateVote as updateVoteMutation,
  deleteVote as deleteVoteMutation,
} from 'utils/mutations';
import { agreementQuery } from 'utils/queries';
import { DataContext } from 'contexts/data';
import { addSection as insertSectionMutation } from 'utils/mutations';
import { JSONContent } from '@tiptap/react';

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
  addSection: (variables: AddSectionVariables) => void;
}

const AgreementContext = createContext<IAgreementContext>({} as IAgreementContext);

const AgreementProvider: FC = () => {
  const { agreementId } = useParams();
  const { user } = useContext(DataContext);
  const userId = user?.id;
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
    if (!version.my_vote) {
      console.log({ version });
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
    addSection(variables) {
      addSection({ variables });
    },
  };
  return (
    <AgreementContext.Provider value={state}>
      <Outlet />
    </AgreementContext.Provider>
  );
};

export { AgreementProvider, AgreementContext };
