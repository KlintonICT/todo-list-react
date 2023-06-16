export const getStatus = (value: boolean): string => {
  if (value) {
    return 'completed';
  }
  return 'pending';
};
