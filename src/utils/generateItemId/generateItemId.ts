export const generateItemId = (): string => {
  // Generates a 4-character string like UUID
  return Math.random().toString(16).substring(2, 6);
}