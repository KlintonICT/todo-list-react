export type IStatus = 'pending' | 'completed';

export interface ITask {
  id: number;
  title: string;
  status: IStatus;
  created_at: string;
  subtasks: ISubtask[];
}

export interface ISubtask {
  id: number;
  title: string;
  status: IStatus;
  created_at: string;
}
