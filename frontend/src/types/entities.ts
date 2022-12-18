import { JSONContent } from '@tiptap/react';

export interface Agreement {
  id: number;
  name: string;
  category: Category;
  updated_at: Date;
  rationale: string;
  is_archived?: boolean;
  chapters?: Chapter[];
}

export interface Category {
  name: string;
  id: number;
}

export interface Chapter {
  id: number;
  index: number;
  name: string;
  sections: Section[];
}

export interface Group {
  id: number;
  agreements?: Agreement[];
  name: string;
  slug: string;
  color: string;
  language: string;
}

export interface Section {
  id: number;
  index: number;
  versions: Version[];
  current_version?: { id: number; content: JSONContent };
}

export interface Version {
  id: number;
  index: number;
  content: JSONContent;
  created_at: Date;
  downvotes: number;
  my_vote?: 'up' | 'down';
  threshold: number;
  upvotes: number;
  author?: {
    full_name: string;
    id: number;
  };
  comment_count: number;
}

export interface User {
  id: number;
  email: string;
  groups?: Group[];
  displayName?: string;
}

export interface Comment {
  id: number;
  author: {
    full_name: string;
    id: number;
  };
  content: string;
  created_at: string;
}

export type LocalChapter = {
  name: string;
  sections: { content?: JSONContent }[];
};
