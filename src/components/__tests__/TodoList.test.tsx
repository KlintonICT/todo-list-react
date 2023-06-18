import { render, screen } from '@testing-library/react';
import { setup } from '@/setupTests';

import * as TodoContext from '@/context/todo';
import { ITodoContext } from '@/context/todo';
import { ITask } from '@/types/todo';
import TodoList from '../TodoList';

describe('TodoList', () => {
  const todoList: ITask[] = [
    {
      id: 1,
      title: 'Todo 1',
      status: 'pending',
      created_at: new Date().toISOString(),
      subtasks: [
        {
          id: 1,
          title: 'Subtask 1',
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ],
    },
  ];

  const mockOnUpdateTodoStatus = jest.fn();
  const todoContextValue = {
    isFetchingTodoList: false,
    todoList,
    updatingTodoStatusId: null,
    onUpdateTodoStatus: mockOnUpdateTodoStatus,
  } as unknown as ITodoContext;

  beforeEach(() => {
    jest
      .spyOn(TodoContext, 'useTodoContext')
      .mockImplementation(() => todoContextValue);
  });

  it('renders TodoList', () => {
    render(<TodoList />);

    const checkbox = screen.getByRole('checkbox');
    const todoText = screen.getByText(/Todo 1/i);
    const completeText = screen.getByText(/0 of 1 completed/i);

    expect(checkbox).toBeInTheDocument();
    expect(todoText).toBeInTheDocument();
    expect(completeText).toBeInTheDocument();
  });

  it('calls onUpdateTodoStatus when a todo checkbox is clicked', async () => {
    const { user } = setup(<TodoList />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(mockOnUpdateTodoStatus).toHaveBeenCalledTimes(1);
    expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(1, 'completed');
  });
});
