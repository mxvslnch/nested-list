

import { ListItem } from "../../types/List";
import { generateItemId } from "../generateItemId";

export const createNewListItem = (parentId: string = ''): ListItem => {
  const currentId = parentId ? `${parentId}-${generateItemId()}` : generateItemId();
  return {
    id: currentId,
    nestedItems: [],
  };
};