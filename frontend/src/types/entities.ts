import { JSONContent } from "@tiptap/react";

export interface IAgreement {
  id: number;
  name: string;
  category: ICategory;
  updated_at: string;
  rationale: string;
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
  id: number;
  content: JSONContent;
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
