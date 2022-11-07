import { useMutation, useQuery } from '@apollo/client';
import { createContext, FC } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { section as sectionQuery } from 'utils/queries';
import { addSectionVersion as insertSectionVersionMutation } from 'utils/mutations';

interface SectionState {
  section?: Section;
  addVersion?: (...args: any[]) => unknown;
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const { sectionId } = useParams();
  const { data } = useQuery<{
    core_sections: Section[];
  }>(sectionQuery, {
    variables: {
      sectionId,
    },
  });

  const state: SectionState = {
    section: data?.core_sections[0],
    addVersion,
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
