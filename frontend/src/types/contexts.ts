import { IUser } from './misc';

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
