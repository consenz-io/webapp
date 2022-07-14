import {IgetGroupName} from "./types";

/**
 * Retrieve group name by index
 *
 * @param index
 * @param groups
 *
 * @return string
 */
export const getGroupName: IgetGroupName = (index, groups) => {
  return groups[index]?.name;
};
