import { useQuery } from '@apollo/client';
import { createContext, FC } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, Section } from 'types';
import { section as sectionQuery } from 'utils/queries';

interface SectionState {
  section?: Section;
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const { sectionId } = useParams();
  console.log('sectionId', sectionId);
  const { data } = useQuery<{
    core_sections: Section[];
  }>(sectionQuery, {
    variables: {
      sectionId,
    },
  });

  const state: SectionState = {
    section: data?.core_sections[0],
  };
  console.log('state', state.section);
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
