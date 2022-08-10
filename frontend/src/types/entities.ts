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

export interface ModalProps {
  open: boolean;
  handleClose: any;
}

export interface ISection {
  id: number;
  content: string;
}

export interface IUser {
  id: number;
  email: string;
  groups?: IGroup[];
  displayName?: string;
}

export type LocalChapter = Pick<IChapter, 'name'> & {
  sections: Pick<ISection, 'content'>[];
};
