import { useQuery } from '@apollo/client';
import { createContext, FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { IAgreement, IAgreementContext } from 'types';
import { getAgreementByIdQuery } from 'utils/queries';

const AgreementContext = createContext<IAgreementContext>({} as IAgreementContext);

const AgreementProvider: FC = () => {
  const { agreementId } = useParams();
  console.log('agreementId', agreementId);
  const { data } = useQuery<{
    core_agreements: IAgreement[];
  }>(getAgreementByIdQuery(), {
    variables: {
      agreementId,
    },
  });
  console.log('data', data);
  const agreement = data?.core_agreements[0];
  const state: IAgreementContext = {
    agreementId: agreement?.id || NaN,
    categoryName: agreement?.category?.name || '',
    rationale: agreement?.rationale || '',
    agreementTitle: agreement?.name || '',
    agreement: agreement,
  };
  return (
    <AgreementContext.Provider value={state}>
      <Outlet />
    </AgreementContext.Provider>
  );
};

export { AgreementProvider, AgreementContext };
