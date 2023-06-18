import { render, screen, act } from '@testing-library/react';

import {
  createTodo,
  getTodoList,
  updateTodoStatus,
  createSubtask,
  updateSubtaskStatus,
} from '@/api';
import { TodoProvider, useTodoContext } from '../todo';

jest.mock('@/api');

describe('TodoProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children and provides context values', async () => {
    const MockChildComponent = () => {
      const todoContext = useTodoContext();

      return (
        <>
          <div data-testid="is-creating-todo">
            {todoContext.isCreatingTodo.toString()}
          </div>
          <div
            data-testid="on-create-todo"
            onClick={() => todoContext.onCreateTodo('New Todo')}
          >
            Create Todo
          </div>
        </>
      );
    };

    render(
      <TodoProvider>
        <MockChildComponent />
      </TodoProvider>
    );

    expect(screen.getByTestId('is-creating-todo').textContent).toBe('false');
    await act(async () => screen.getByTestId('on-create-todo').click());
    expect(createTodo).toHaveBeenCalledWith({ title: 'New Todo' });
  });

  it('calls getTodoList api and updates todo list', async () => {
    const mockTodoList = [
      { id: 1, title: 'Todo 1', status: 'pending', subtasks: [] },
      { id: 2, title: 'Todo 2', status: 'completed', subtasks: [] },
    ];

    (getTodoList as jest.Mock).mockResolvedValue(mockTodoList);

    const MockChildComponent = () => {
      const todoContext = useTodoContext();

      return (
        <div data-testid="todo-list-length">{todoContext.todoList.length}</div>
      );
    };

    render(
      <TodoProvider>
        <MockChildComponent />
      </TodoProvider>
    );

    expect(screen.getByTestId('todo-list-length').textContent).toBe('0');

    // wait to fetch todo list
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getTodoList).toHaveBeenCalled();
    expect(screen.getByTestId('todo-list-length').textContent).toBe(
      mockTodoList.length.toString()
    );
  });

  it('calls createSubtask api when click on onCreateSubtask', async () => {
    const mockTodoList = [
      { id: 1, title: 'Todo 1', status: 'pending', subtasks: [] },
    ];

    const mockSubtask = {
      message: 'Subtask 1 has successfully created',
      data: {
        id: 1,
        title: 'Subtask 1',
        status: 'pending',
        created_at: new Date().toString(),
      },
    };

    (getTodoList as jest.Mock).mockResolvedValue(mockTodoList);
    (createSubtask as jest.Mock).mockResolvedValue(mockSubtask);

    const MockChildComponent = () => {
      const todoContext = useTodoContext();

      return (
        <>
          <div data-testid="todo-list-length">
            {todoContext.todoList.length}
          </div>
          <div data-testid="subtask-list-length">
            {todoContext.todoList[0]?.subtasks.length}
          </div>
          <div
            data-testid="on-create-subtask"
            onClick={() => todoContext.onCreateSubtask(1, 'Subtask 1')}
          >
            Create Subtask
          </div>
        </>
      );
    };

    render(
      <TodoProvider>
        <MockChildComponent />
      </TodoProvider>
    );

    expect(screen.getByTestId('todo-list-length').textContent).toBe('0');

    // wait to fetch todo list
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getTodoList).toHaveBeenCalled();
    expect(screen.getByTestId('todo-list-length').textContent).toBe(
      mockTodoList.length.toString()
    );

    expect(screen.getByTestId('subtask-list-length').textContent).toBe('0');
    await act(async () => screen.getByTestId('on-create-subtask').click());

    expect(createSubtask).toHaveBeenCalledWith({
      todo_id: 1,
      title: 'Subtask 1',
    });
    expect(screen.getByTestId('subtask-list-length').textContent).toBe('1');
  });

  it('calls updateTodoStatus api when click onUpdateTodoStatus', async () => {
    const mockTodoList = [
      { id: 1, title: 'Todo 1', status: 'pending', subtasks: [] },
    ];

    (getTodoList as jest.Mock).mockResolvedValue(mockTodoList);
    (updateTodoStatus as jest.Mock).mockResolvedValue('success');

    const MockChildComponent = () => {
      const todoContext = useTodoContext();

      return (
        <>
          <div data-testid="todo-status">{todoContext.todoList[0]?.status}</div>
          <div
            data-testid="on-update-todo-status"
            onClick={() => todoContext.onUpdateTodoStatus(1, 'completed')}
          >
            Complete Todo
          </div>
        </>
      );
    };

    render(
      <TodoProvider>
        <MockChildComponent />
      </TodoProvider>
    );

    // wait to fetch todo list
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getTodoList).toHaveBeenCalled();
    expect(screen.getByTestId('todo-status').textContent).toBe('pending');

    await act(async () => screen.getByTestId('on-update-todo-status').click());
    expect(updateTodoStatus).toHaveBeenCalledWith({
      id: 1,
      status: 'completed',
    });
    expect(screen.getByTestId('todo-status').textContent).toBe('completed');
  });

  it('calls updateSubtaskStatus api when click onUpdateSubtaskStatus', async () => {
    const mockTodoList = [
      {
        id: 1,
        title: 'Todo 1',
        status: 'pending',
        subtasks: [
          {
            id: 1,
            title: 'Subtask 1',
            status: 'pending',
          },
        ],
      },
    ];

    (getTodoList as jest.Mock).mockResolvedValue(mockTodoList);
    (updateSubtaskStatus as jest.Mock).mockResolvedValue({
      message: 'success',
      todo_id: 1,
      todoStatus: 'completed',
    });

    const MockChildComponent = () => {
      const todoContext = useTodoContext();

      return (
        <>
          <div data-testid="todo-status">
            {todoContext.todoList[0]?.status}
          </div>
          <div data-testid="subtask-status">
            {todoContext.todoList[0]?.subtasks[0]?.status}
          </div>
          <div
            data-testid="on-update-subtask-status"
            onClick={() => todoContext.onUpdateSubtaskStatus(1, 'completed')}
          >
            Complete Todo
          </div>
        </>
      );
    };

    render(
      <TodoProvider>
        <MockChildComponent />
      </TodoProvider>
    );

    // wait to fetch todo list
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getTodoList).toHaveBeenCalled();
    expect(screen.getByTestId('todo-status').textContent).toBe('pending');
    expect(screen.getByTestId('subtask-status').textContent).toBe('pending');

    await act(async () => screen.getByTestId('on-update-subtask-status').click());
    expect(updateSubtaskStatus).toHaveBeenCalledWith({
      id: 1,
      status: 'completed',
    });
    expect(screen.getByTestId('todo-status').textContent).toBe('completed');
    expect(screen.getByTestId('subtask-status').textContent).toBe('completed');
  });
});
