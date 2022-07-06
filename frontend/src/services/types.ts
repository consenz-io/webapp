export interface IAuthContext {
  setJwt: (jwt: string) => void;
  jwt: string;
}

export type FCProps = {
  children: JSX.Element;
};

export type AgreementCardProps = {
  tag: string;
  title: string;
  updatedAt: string;
  participants: string;
  icon: string | any;
};
