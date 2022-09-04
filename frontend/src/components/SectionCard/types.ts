import { IAgreement, IChapter } from 'types';

export interface SectionProps {
  suggestions: Suggestion[];
  sectionIndex: number;
}

export interface Suggestion {
  content: string;
  index: number;
  type: string;
}

export interface fetchedAgreement extends IAgreement {
  chapters: IChapter[];
}
