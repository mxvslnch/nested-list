import { createNewListItem } from './createNewListItem';

describe('createNewListItem', () => {
  it('should create a new list item with a valid ID when no parentId is provided', () => {
    const newItem = createNewListItem();

    // Check that the id is a 4-character string
    expect(newItem.id).toHaveLength(4);
    expect(typeof newItem.id).toBe('string');

    // Check that nestedItems is an empty array
    expect(newItem.nestedItems).toHaveLength(0);
  });

  it('should create a new list item with a nested ID when parentId is provided', () => {
    const parentId = 'parent-1234';
    const newItem = createNewListItem(parentId);

    // Check that the id starts with the parentId and a dash, followed by a 4-character string
    expect(newItem.id).toMatch(/^parent-1234-[a-f0-9]{4}$/);

    // Check that nestedItems is an empty array
    expect(newItem.nestedItems).toHaveLength(0);
  });

  it('should generate unique IDs for different calls, even with the same parentId', () => {
    const parentId = 'parent-5678';

    const firstItem = createNewListItem(parentId);
    const secondItem = createNewListItem(parentId);

    // Check that the two items have different IDs
    expect(firstItem.id).not.toEqual(secondItem.id);

    // Check that both IDs start with the same parentId
    expect(firstItem.id.startsWith(parentId)).toBe(true);
    expect(secondItem.id.startsWith(parentId)).toBe(true);

    // Check that nestedItems is an empty array for both items
    expect(firstItem.nestedItems).toHaveLength(0);
    expect(secondItem.nestedItems).toHaveLength(0);
  });

  it('should ensure the generated ID has correct length when there is a parentId', () => {
    const parentId = 'test-parent';
    const newItem = createNewListItem(parentId);

    // Check that the total ID length is parentId length + 5 (1 dash + 4 characters)
    expect(newItem.id).toHaveLength(parentId.length + 5);
  });
});