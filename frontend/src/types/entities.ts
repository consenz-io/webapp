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
