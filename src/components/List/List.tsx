import { FC, memo } from 'react';
import { Item } from './Item';
import { ListItem } from '../../types/List';

interface Props {
  items: ListItem[];
  parent?: ListItem['id']
}

export const List: FC<Props> = memo(({ items, parent }) => {
  return (
    <>
      {items && items.map((item) => {
        return <Item key={item.id} data={item} parent={parent} />
      })}
    </>
  )
});