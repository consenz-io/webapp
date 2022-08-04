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

export type ICategorySelectProps = {
  categoryId: number | null;
  onChange: (categoryId: number) => void;
  onSelecting: () => void;
  onReady: () => void;
};

export type INewTopicsEditorProps = {
  agreementId: number;
  data: Array<{
    id?: number;
    index?: number;
    name?: string;
    agreement_id?: number;
    sections?: Array<object>;
  }>;
};

export type INewTopicProps = {
  data: {
    id?: number;
    index?: number;
    name?: string;
    agreement_id?: number;
    sections?: Array<{
      id?: number;
      agreement_id?: number;
      topic_id?: number;
      index?: number;
      content?: string;
    }>;
  };
  onInsert: (name: string) => void;
  onChange: (topicId: number, name: string) => void;
  onDelete: (topicId: number, index: number) => void;
};

export type INewSectionProps = {
  data: {
    id?: number;
    agreement_id?: number;
    topic_id?: number;
    index?: number;
    suggestions?: [{ id?: number; content?: string }];
  };
  onInsert: (topicId: number, index: number, content: string) => void;
  onChange: (suggestionId: number, content: string) => void;
  onDelete: (sectionId: number, index: number) => void;
  onCreateNext: (topicId: number, index: number) => void;
};
