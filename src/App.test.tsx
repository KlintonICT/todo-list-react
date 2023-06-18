import { render, screen } from '@testing-library/react';

import * as TodoContext from '@/context/todo';
import { ITodoContext } from '@/context/todo';

import App from './App';

describe('App', () => {
  const todoContextValue = {
    isCreatingTodo: false,
    onCreateTodo: jest.fn(),
    todoList: [],
  } as unknown as ITodoContext;

  beforeEach(() => {
    jest
      .spyOn(TodoContext, 'useTodoContext')
      .mockImplementation(() => todoContextValue);
  });

  it('renders App', () => {
    render(<App />);

    const title = screen.getByText(/Todo App/i);
    const form = screen.getByRole('form');

    expect(title).toBeInTheDocument();
    expect(form).toHaveAttribute('name', 'todo-form');
  });
});
