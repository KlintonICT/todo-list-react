import { AxiosResponse } from 'axios';
import api from '@/utils/config';

import {
  ICreateSubtask,
  ICreateSubtaskRes,
  IUpdateSubtaskStatus,
  IUpdateSubtaskStatusRes,
} from './type';

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

export const updateSubtaskStatus = async ({
  id,
  status,
}: IUpdateSubtaskStatus): Promise<IUpdateSubtaskStatusRes> => {
  const res: AxiosResponse<IUpdateSubtaskStatusRes> = await api({
    method: 'PATCH',
    url: `subtasks/${id}`,
    data: { status },
  });

  return res.data;
};
