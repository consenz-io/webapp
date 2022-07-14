import { Group } from "utils/types";

export type User = {
  name: string,
  groups: Group[],
  currentGroup: number
}

export interface IDataContext {
    globalIsItGood: boolean,
    toggleGlobalIsItGood?: () => void,
    globalUser: User,
    setGlobalUserData?: (arg0: User) => void
}

export type FCProps = {
  children: JSX.Element,
};
