import { ReactNode } from 'react';

export enum ThemeModeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export type MenuItem = {
  text: string;
  color?: string;
  icon?: ReactNode;
  action?: () => void;
};

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
  id: number;
}

export interface IAgreement {
  id: number;
  name: string;
  category: ICategory;
  updated_at: string;
  rationale: string;
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

export type ICategorySelectProps = {
  categoryId: number | null;
  onChange: (categoryId: number) => void;
  onReady: () => void;
};

export type IInlineTextEditProps = {
  value: string | undefined;
  label: string | undefined;
  maxWidth: number;
  onChange: (value: string) => void;
  style?: object;
};
