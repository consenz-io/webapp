export interface IAuthContext {
  setJwt: (jwt: string) => void;
  jwt: string
}

export type FCProps = {
  children: JSX.Element;
};
