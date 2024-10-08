import { ListItem } from "../types/List";
import { generateItemId } from "../utils/generateItemId";

const MAX_NESTED_ITEMS = 3;
const MAX_DEPTH = 1;

export const generateListItem = (parentId = '', depth = 0): ListItem => {
  const currentId = parentId ? `${parentId}-${generateItemId()}` : generateItemId();

  const item: ListItem = {
    id: currentId,
    nestedItems: []
  };

  if (depth < MAX_DEPTH) {
    const numberOfNestedItems = Math.floor(Math.random() * (MAX_NESTED_ITEMS + 1));

    for (let i = 0; i < numberOfNestedItems; i++) {
      item.nestedItems.push(generateListItem(currentId, depth + 1));  // Recursively generate nested items
    }
  }

  return item;
};

const generateList = (numberOfItems = 3, maxDepth = 4): ListItem[] => {
  const generateNestedItems = (depth: number, parentId: string): ListItem[] => {
    const numberOfNestedItems = Math.floor(Math.random() * (MAX_NESTED_ITEMS + 1));
    return Array.from({ length: numberOfNestedItems }, () => generateListItem(depth + 1, parentId));
  };



  return Array.from({ length: numberOfItems }, () => generateListItem());
};

export const getList = (): Promise<ListItem[]> => {
  // Random delay between 0.1s and 0.5s
  const randomDelay = Math.random() * (500 - 100) + 100;

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(generateList());
    }, randomDelay);
  });
};