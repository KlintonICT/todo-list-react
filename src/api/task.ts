import { AxiosResponse } from 'axios';
import api from '@/utils/config';

import {
  ICreateTodo,
  ICreateTodoRes,
  IGetTodoListRes,
  IUpdateTodoStatus,
} from './type';

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

export const getTodoList = async (): Promise<IGetTodoListRes> => {
  const res: AxiosResponse<IGetTodoListRes> = await api({
    method: 'GET',
    url: '/tasks',
  });

  return res.data;
};

export const updateTodoStatus = async ({ id, status }: IUpdateTodoStatus) =>
  api({ method: 'PATCH', url: `tasks/${id}`, data: { status } });
