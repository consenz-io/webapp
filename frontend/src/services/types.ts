export interface IAuthContext {
  setJwt: (jwt: string) => void;
  jwt: string;
}

export type FCProps = {
  children: JSX.Element;
};

export type UserQueryObject = {
  __typename: string;
  email: string;
  id: number;
  user_groups: object[];
};
