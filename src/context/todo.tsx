import { createContext, useContext, useState, useEffect, useMemo } from 'react';

import {
  createTodo,
  getTodoList,
  updateTodoStatus,
  createSubtask,
  updateSubtaskStatus,
} from '@/api';
import { ITask, IStatus } from '@/types/todo';
import Modal from '@/components/Modal';

interface TodoProviderProps {
  children: React.ReactNode;
}

interface ITodoContext {
  isCreatingTodo: boolean;
  onCreateTodo: (title: string) => void;

  todoList: ITask[];
  isFetchingTodoList: boolean;

  onUpdateTodoStatus: (id: number, status: IStatus) => void;
  updatingTodoStatusId: number | null;

  isCreatingSubtask: boolean;
  onCreateSubtask: (todo_id: number, title: string) => void;

  updatingSubtaskStatusId: number | null;
  onUpdateSubtaskStatus: (id: number, status: IStatus) => void;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const [isFetchingTodoList, setFetchingTodoList] = useState(false);

  const [isCreatingTodo, setCreatingTodo] = useState(false);
  const [isCreatingSubtask, setCreatingSubtask] = useState(false);

  const [updatingTodoStatusId, setUpdatingTodoStatusId] = useState<
    number | null
  >(null);
  const [updatingSubtaskStatusId, setUpdatingSubtaskStatusId] = useState<
    number | null
  >(null);

  const onCreateTodo = async (title: string) => {
    setCreatingTodo(true);
    try {
      const todo = await createTodo({ title });

      setTodoList([...todoList, todo.data]);
      setCreatingTodo(false);
    } catch (error: any) {
      const res = error?.response?.data;

      setCreatingTodo(false);

      Modal.error({
        title: 'Creation Failed',
        content: res?.message || '',
      });
    }
  };

  const onCreateSubtask = async (todo_id: number, title: string) => {
    setCreatingSubtask(true);

    try {
      const res = await createSubtask({ todo_id, title });

      const tasks: ITask[] = [...todoList].map((todo) => {
        if (todo.id === todo_id) {
          return {
            ...todo,
            status: 'pending',
            subtasks: [...todo.subtasks, res.data],
          };
        }

        return todo;
      });

      setTodoList(tasks);

      setCreatingSubtask(false);
    } catch (error: any) {
      const res = error?.response?.data;

      setCreatingSubtask(false);

      Modal.error({
        title: 'Creation Failed',
        content: res?.message || '',
      });
    }
  };

  const onUpdateTodoStatus = async (id: number, status: IStatus) => {
    setUpdatingTodoStatusId(id);
    try {
      await updateTodoStatus({ id, status });

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status,
                subtasks: todo.subtasks.map((sub) => ({ ...sub, status })),
              }
            : todo
        )
      );
      setUpdatingTodoStatusId(null);
    } catch (error: any) {
      setUpdatingTodoStatusId(null);

      Modal.error({
        title: 'Update Failed',
      });
    }
  };

  const onUpdateSubtaskStatus = async (id: number, status: IStatus) => {
    setUpdatingSubtaskStatusId(id);
    try {
      const res = await updateSubtaskStatus({ id, status });

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === res.todo_id
            ? {
                ...todo,
                status: res.todoStatus,
                subtasks: todo.subtasks.map((sub) =>
                  sub.id === id ? { ...sub, status } : sub
                ),
              }
            : todo
        )
      );
      setUpdatingSubtaskStatusId(null);
    } catch (error: any) {
      setUpdatingSubtaskStatusId(null);

      Modal.error({
        title: 'Update Failed',
      });
    }
  };

  const fetchTodoList = async () => {
    setFetchingTodoList(true);
    try {
      const res = await getTodoList();
      setTodoList(res);
    } catch (error) {
      console.log('Fetch todo list failed: ' + error);
    }
    setFetchingTodoList(false);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const contextValue: ITodoContext = useMemo(
    () => ({
      isCreatingTodo,
      onCreateTodo,

      todoList,
      isFetchingTodoList,

      updatingTodoStatusId,
      onUpdateTodoStatus,

      isCreatingSubtask,
      onCreateSubtask,

      updatingSubtaskStatusId,
      onUpdateSubtaskStatus,
    }),
    []
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = (): ITodoContext => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return todoContext;
};
