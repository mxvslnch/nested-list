import { ListItem } from '../../types/List';
import { FC, memo, useCallback, useEffect } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { List } from './List';
import styled from 'styled-components';
import { useItemsStore } from '../../store/itemsStore';

interface Props {
  data: ListItem;
  parent?: ListItem['id'];
}

const Wrapper = styled.div < { $hasParent: boolean }> `
  ${props => props.$hasParent && 'padding-left: 60px;'}
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Item: FC<Props> = memo(({ data, parent }) => {
  const { id, nestedItems } = data;
  const { items, addItem, removeItem } = useItemsStore();

  const handleAddItem = useCallback(() => {
    addItem(id);
  }, [items, addItem, id]);

  const handleRemoveItem = useCallback(() => {
    removeItem(id)
  }, [items, removeItem, id]);

  return (
    <Wrapper $hasParent={Boolean(parent)}>
      <Card title={`Item #${id}`} parent={parent}>
        <ButtonWrapper>
          <Button onClick={handleAddItem} text={'Add child item'} />
          {parent && <Button onClick={handleRemoveItem} text={'Delete'} />}
        </ButtonWrapper>
      </Card>

      {nestedItems && <List items={nestedItems} parent={id} />}
    </Wrapper>
  )
})