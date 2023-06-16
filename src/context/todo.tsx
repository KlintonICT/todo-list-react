import { createContext, useContext, useState } from 'react';

import { createTodo } from '@/api';
import { ITask } from '@/types/todo';
import Modal from '@/components/Modal';

interface TodoProviderProps {
  children: React.ReactNode;
}

interface ITodoContext {
  isCreatingTodo: boolean;
  onCreateTodo: (title: string) => void;
  todoList: ITask[];
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const [isCreatingTodo, setCreatingTodo] = useState(false);

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

  const contextValue: ITodoContext = {
    isCreatingTodo,
    onCreateTodo,
    todoList,
  };

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
