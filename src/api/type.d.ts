import { ITask, IStatus, ISubtask } from '@/interface/todo';

export interface ICreateTodo {
  title: string;
}

export interface ICreateTodoRes {
  message: string;
  data: ITask;
}

export type IGetTodoListRes = ITask[];

export interface IUpdateTodoStatus {
  id: number;
  status: IStatus;
}

export interface ICreateSubtask {
  todo_id: number;
  title: string;
}

export interface ICreateSubtaskRes {
  message: string;
  data: ISubtask;
}

export interface IUpdateSubtaskStatus {
  id: number;
  status: IStatus;
}

export interface IUpdateSubtaskStatusRes {
  message: string;
  todo_id: number;
  todoStatus: IStatus;
}
