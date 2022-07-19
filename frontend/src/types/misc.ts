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

export interface ICategory {
  name: string;
}

export interface IAgreement {
  id: string;
  name: string;
  category: ICategory;
  updated_at: string;
}

export interface IUser {
  id: number;
  email: string;
  groups?: IGroup[];
  displayName?: string;
}

export interface IGroup {
  id: number;
  agreements?: IAgreement[];
  name: string;
  slug: string;
  color: string;
}

export type IAgreementCardProps = {
  category?: string;
  title: string;
  updatedAt: Date;
  participants: number;
};
