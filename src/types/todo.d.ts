export interface ITask {
  id: number;
  title: string;
  status: string;
  created_at: string;
  subtasks: ISubtask[];
}

export interface ISubtask {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

export type IStatus = 'pending' | 'completed';
