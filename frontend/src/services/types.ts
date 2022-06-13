export interface IApiContext {
  isVideoExist: (url: string) => Promise<string>;
}

export interface IAuthContext {
  storeJwt: (jwt: string) => void;
}

export type FCProps = {
  children: JSX.Element;
};
