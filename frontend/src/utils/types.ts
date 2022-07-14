export type Group = {
  name: string;
  slug: string,
  color: string,
}

export interface IgetGroupName {
  (index: number, groups: Group[]): string;
}
