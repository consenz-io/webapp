import { IUser } from "./misc";

export interface IAuthContext {
  jwt?: string;
  logout: () => void;
}

export interface IDataContext {
  user?: IUser;
}

export interface IRoutingContext {
  navigateToWelcome: () => void;
}