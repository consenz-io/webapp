export enum ThemeModeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export type IFCProps = {
  children: JSX.Element;
};

export interface IOutletContext {
  sidebar: {
    handleSidebarToggle: () => void;
  };
}

export interface IUser {
  id: number;
  email: string;
  groups?: IGroup[] | null;
  displayName?: string;
}

export interface IGroup {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export type AgreementCardProps = {
  tag: string;
  title: string;
  updatedAt: string;
  participants: string;
  icon: string | JSX.Element;
};
