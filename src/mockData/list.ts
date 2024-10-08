import { ListItem } from "../types/List";
import { createNewListItem } from "../utils/createNewListItem";

const MAX_NESTED_ITEMS = 3;
const MAX_DEPTH = 4;

// Function for generating a list with nested items
export const generateList = (numberOfItems = MAX_NESTED_ITEMS, maxDepth = MAX_DEPTH): ListItem[] => {
  const generateListItem = (depth = 0, parentId = ''): ListItem => {
    const item = createNewListItem(parentId);

    if (depth < maxDepth) {
      const numberOfNestedItems = Math.floor(Math.random() * MAX_NESTED_ITEMS); // 0 to 3 nested items
      for (let i = 0; i < numberOfNestedItems; i++) {
        item.nestedItems.push(generateListItem(depth + 1, item.id));
      }
    }

    return item;
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