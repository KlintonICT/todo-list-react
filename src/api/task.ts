import { AxiosResponse } from 'axios';
import api from '@/utils/config';

import { ICreateTodo, ICreateTodoRes } from './type';

export const createTodo = async (
  data: ICreateTodo
): Promise<ICreateTodoRes> => {
  const res: AxiosResponse<ICreateTodoRes> = await api({
    method: 'POST',
    url: '/tasks',
    data,
  });

  return res.data;
};
