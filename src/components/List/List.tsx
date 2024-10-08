import { FC, memo, useCallback } from 'react';
import { Item } from './Item';
import { ListItem } from '../../types/List';
import { Button } from '../UI/Button';
import { useItemsStore } from '../../store/itemsStore';

interface Props {
  items: ListItem[];
  parent?: ListItem['id']
}

export const List: FC<Props> = memo(({ items, parent }) => {
  const { addItem } = useItemsStore();

  const handleAddItem = useCallback(() => {
    addItem();
  }, [addItem]);

  return (
    <>
      {items && items.map((item) => {
        return <Item key={item.id} data={item} parent={parent} />
      })}

      {!parent && <Button onClick={handleAddItem} text={'Add item'} />}
    </>
  )
});