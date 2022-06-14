export interface IAuthContext {
  storeJwt: (jwt: string) => void;
}

export type FCProps = {
  children: JSX.Element;
};
