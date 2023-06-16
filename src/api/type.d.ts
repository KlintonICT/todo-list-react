import { ITask } from '@/interface/todo';

export interface ICreateTodo {
  title: string;
}

export interface ICreateTodoRes {
  message: string;
  data: ITask;
}

export type IGetTodoListRes = ITask[];
