import { useQuery } from '@apollo/client';
import { createContext, FC } from 'react';
import { useParams } from 'react-router-dom';
import { IFCProps, ISection } from 'types';
import { section as sectionQuery } from 'utils/queries';

interface SectionState {
  section?: ISection;
}

const SectionContext = createContext<SectionState>({});

const SectionProvider: FC<IFCProps> = ({ children }) => {
  const { sectionId } = useParams();
  const { data } = useQuery<{
    core_sections: ISection[];
  }>(sectionQuery, {
    variables: {
      sectionId,
    },
  });

  const state: SectionState = {
    section: data?.core_sections[0],
  };
  return <SectionContext.Provider value={state}>{children}</SectionContext.Provider>;
};

export { SectionProvider, SectionContext };
