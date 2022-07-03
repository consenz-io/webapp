type Group = {
  slug: string,
  text: string,
  color: string,
}

export interface IgetGroupName {
  (index: number, groups: Group[]): string;
}
