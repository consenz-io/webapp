import { useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { IAgreement, IAgreementContext } from 'types';
import { voteMutation } from 'utils/mutations';
import { agreementByIdQuery } from 'utils/queries';
import { DataContext } from 'contexts/data';

const AgreementContext = createContext<IAgreementContext>({} as IAgreementContext);

const AgreementProvider: FC = () => {
  const { agreementId } = useParams();
  const { user } = useContext(DataContext);
  const user_id = user?.id;
  const { data } = useQuery<{
    core_agreements: IAgreement[];
  }>(agreementByIdQuery, {
    variables: {
      agreementId,
    },
  });

  const [voteFn, { error: voteError }] = useMutation(voteMutation, {
    refetchQueries: ['agreement'],
  });

  const vote = async (version_id: number, type: 'up' | 'down') => {
    if (!user_id || !version_id) {
      console.error(
        `error in voting: bad arguments: user_id: ${user_id}, version_id: ${version_id}`
      );
      return;
    }
    if (type !== 'up' && type !== 'down') {
      console.error(`error in voting: vote can be type up or down`);
      return;
    }
    const voteRes = await voteFn({
      variables: {
        user_id,
        version_id,
        type,
      },
    });
    if (voteError) {
      console.error(`error in voting: ${voteError}`);
      return;
    }
    return voteRes;
  };

  const agreement = data?.core_agreements[0];
  const state: IAgreementContext = {
    agreementId: agreement?.id || NaN,
    categoryName: agreement?.category?.name || '',
    rationale: agreement?.rationale || '',
    agreementTitle: agreement?.name || '',
    agreement: agreement,
    vote: (version_id, type) => vote(version_id, type),
  };
  return (
    <AgreementContext.Provider value={state}>
      <Outlet />
    </AgreementContext.Provider>
  );
};

export { AgreementProvider, AgreementContext };
