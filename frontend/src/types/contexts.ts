import { User } from './entities';

export interface IDataContext {
  user?: User | null;
}

export interface IRoutingContext {
  navigateToWelcome: () => void;
  navigateToAllAgreements: (groupSlug: string | undefined) => void;
}
