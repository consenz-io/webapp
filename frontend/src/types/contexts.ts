import { FetchResult } from '@apollo/client';
import { IAgreement, ICategory, IUser, LocalChapter } from './entities';

export interface IAuthContext {
  jwt?: string;
  logout: () => void;
  role?: string;
}

export interface IDataContext {
  user?: IUser | null;
}

export interface IRoutingContext {
  navigateToWelcome: () => void;
  navigateToAllAgreements: (groupSlug: string | undefined) => void;
}

export interface IGroupContext {
  slug: string;
  name: string;
  id: number;
  activeAgreements: IAgreement[];
  archivedAgreements: IAgreement[];
  categories: ICategory[];
  currentCategory?: ICategory;
  archiveAgreement: (id: number, iArchived: boolean) => void;
  deleteAgreement: (id: number) => void;
  addAgreement: (
    categoryId: number | null,
    name: string,
    rationale: string,
    chapters: LocalChapter[]
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  addAgreementData: unknown;
  addAgreementError: unknown;
  addAgreementLoading: boolean;
}

export interface IAgreementContext {
  agreementId: number;
  agreement: IAgreement | undefined;
  rationale: string;
  agreementTitle: string;
  categoryName: string;
}
