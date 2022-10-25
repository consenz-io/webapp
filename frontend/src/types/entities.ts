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
  index: number;
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
  index: number;
  versions: IVersion[];
  current_version?: { id: number } | null;
}

export interface IVersion {
  id: number;
  index: number;
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
