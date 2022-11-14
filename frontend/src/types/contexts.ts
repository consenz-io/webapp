import { FetchResult } from '@apollo/client';
import { Agreement, Category, User, LocalChapter } from './entities';

export interface IAuthContext {
  jwt?: string;
  logout: () => void;
  role?: string;
}

export interface IDataContext {
  user?: User | null;
}

export interface IRoutingContext {
  navigateToWelcome: () => void;
  navigateToAllAgreements: (groupSlug: string | undefined) => void;
}

export interface IGroupContext {
  slug: string;
  name: string;
  id: number;
  activeAgreements: Agreement[];
  archivedAgreements: Agreement[];
  categories: Category[];
  currentCategory?: Category;
  archiveAgreement: (id: number, iArchived: boolean) => void;
  deleteAgreement: (id: number) => void;
  addAgreement: (
    categoryId: number | null,
    name: string,
    rationale: string,
    chapters: LocalChapter[]
  ) => Promise<FetchResult>;
  addAgreementData: unknown;
  addAgreementError: unknown;
  addAgreementLoading: boolean;
}
