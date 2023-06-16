import { AxiosResponse } from 'axios';
import api from '@/utils/config';

import { ICreateSubtask, ICreateSubtaskRes } from './type';

export const createSubtask = async (
  data: ICreateSubtask
): Promise<ICreateSubtaskRes> => {
  const res: AxiosResponse<ICreateSubtaskRes> = await api({
    method: 'POST',
    url: '/subtasks',
    data,
  });

  return res.data;
};
