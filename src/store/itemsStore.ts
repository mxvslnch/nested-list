import { create } from 'zustand';
import { ListItem } from '../types/List';
import { createNewListItem } from '../utils/createNewListItem';
import { getList } from '../mockData/list';

interface ItemsStore {
  items: ListItem[];
  fetchItems: () => void;
  addItem: (parentId?: string) => void;
  removeItem: (itemIdToDelete: string) => void;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  items: [],
  fetchItems: async () => {
    try {
      const fetchedItems = await getList();
      set((state) => ({ ...state, items: fetchedItems }))
      return;
    } catch (err) {
      throw new Error;
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
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.id !== itemIdToDelete),
    }))
  }
}))