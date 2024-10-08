import { generateItemId } from './generateItemId';

describe('generateItemId', () => {
  it('should return a string with 4 characters', () => {
    const id = generateItemId();
    expect(id).toHaveLength(4);
  });

  it('should return a string containing only hexadecimal characters', () => {
    const id = generateItemId();
    const hexRegex = /^[0-9a-f]{4}$/; // 4 characters in hexadecimal
    expect(id).toMatch(hexRegex);
  });

  it('should generate unique values', () => {
    const id1 = generateItemId();
    const id2 = generateItemId();
    expect(id1).not.toEqual(id2);
  });
});