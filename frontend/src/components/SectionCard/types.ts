import { IAgreement, IChapter } from 'types';

export interface fetchedAgreement extends IAgreement {
  chapters: IChapter[];
}
