import { IStatus } from '@/types/todo';

export const getStatus = (value: boolean): IStatus => {
  if (value) {
    return 'completed';
  }
  return 'pending';
};
