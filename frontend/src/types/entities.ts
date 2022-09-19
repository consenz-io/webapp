import { JSONContent } from '@tiptap/react';

export interface IAgreement {
  id: number;
  name: string;
  category: ICategory;
  updated_at: string;
  rationale: string;
  is_archived?: boolean;
  chapters?: IChapter[];
}

export interface ICategory {
  name: string;
  id: number;
}

export interface IChapter {
  id: number;
  name: string;
  sections: ISection[];
}

export interface IGroup {
  id: number;
  agreements?: IAgreement[];
  name: string;
  slug: string;
  color: string;
}

export interface ISection {
  id: number;
  suggestions: ISuggestion[];
}

export interface ISuggestion {
  id: number; // unique row ID in Hasura
  index: number; // aka "version number", the suggestion's base-1 index per section, in chronological order
  content: JSONContent | string;
  upvotes: number;
  downvotes: number;
}

export interface IUser {
  id: number;
  email: string;
  groups?: IGroup[];
  displayName?: string;
}

export type LocalChapter = {
  name: string;
  sections: { content?: JSONContent }[];
};
