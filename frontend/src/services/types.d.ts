export interface IApiContext {
    isVideoExist: (url: string) => Promise<string>;
  }

export type FCProps = {
  children: JSX.Element,
};