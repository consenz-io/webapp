export enum ThemeModeType {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export type IFCProps = {
  children: JSX.Element;
};

export interface IOutletContext {
  sidebar: {
      handleSidebarToggle: () => void,
  }
}

export interface IUser {
  id: number;
  email: string;
  groups?: IGroup[];
}

export interface IGroup {
  id: number;
  name: string;
  slug: string;
}

export type AgreementCardProps = {
  tag: string;
  title: string;
  updatedAt: string;
  participants: string;
  icon: string | JSX.Element;
};
