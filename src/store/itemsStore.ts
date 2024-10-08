import { create } from 'zustand';
import { ListItem } from '../types/List';
import { createNewListItem } from '../utils/createNewListItem';
import { getList } from '../mockData/list';

interface ItemsStore {
  fetchingItems: boolean;
  items: ListItem[];
  fetchItems: () => void;
  addItem: (parentId?: string) => void;
  removeItem: (itemIdToDelete: string) => void;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  fetchingItems: true,
  items: [],
  fetchItems: async () => {
    try {
      const fetchedItems = await getList();
      set((state) => ({ ...state, items: fetchedItems }))
      return;
    } catch (err) {
      throw new Error;
    } finally {
      set((state) => ({ ...state, fetchingItems: false }))
    }
  },
  addItem: (parentId?) => {
    const newItem = createNewListItem(parentId);

    set((state) => {
      // Function to recursively find the parent item and add the new item to its nestedItems
      const addItemToParent = (items: ListItem[], parentId: string): ListItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            // If this is the parent, add the new item to its nestedItems
            return {
              ...item,
              nestedItems: [...item.nestedItems, newItem],
            };
          } else if (item.nestedItems.length > 0) {
            // Recursively search in nested items
            return {
              ...item,
              nestedItems: addItemToParent(item.nestedItems, parentId),
            };
          } else {
            return item;
          }
        });
      };

      // If no parentId is provided, add the item to the root level
      const updatedItems = parentId
        ? addItemToParent(state.items, parentId)
        : [...state.items, newItem];

      return {
        ...state,
        items: updatedItems,
      };
    });
  },
  removeItem: (itemIdToDelete) => {
    set((state) => {
      // Function to recursively remove the item with the matching ID
      const removeItemRecursively = (items: ListItem[]): ListItem[] => {
        return items
          .filter(item => item.id !== itemIdToDelete) // Filter out the item if it matches
          .map(item => ({
            ...item,
            // Recursively check and remove from nestedItems
            nestedItems: removeItemRecursively(item.nestedItems),
          }));
      };

      // Update the state with the filtered items
      return {
        ...state,
        items: removeItemRecursively(state.items),
      };
    });
  },
}))