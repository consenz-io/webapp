import { IAgreement, ICategory, IUser } from './entities';

export interface IAuthContext {
  jwt?: string;
  logout: () => void;
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
  archiveAgreement: (id: number, iArchived: boolean) => void;
  deleteAgreement: (name: string) => void;
}
