import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as TodoContext from '@/context/todo';
import { ITodoContext } from '@/context/todo';
import { ITask } from '@/types/todo';
import SubtaskList from '../SubtaskList';

function setup(jsx: any) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('SubtaskList', () => {
  const task: ITask = {
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
      {
        id: 2,
        title: 'Subtask 2',
        status: 'completed',
        created_at: new Date().toISOString(),
      },
    ],
  };

  const mockOnCreateSubtask = jest.fn();
  const mockOnUpdateSubtaskStatus = jest.fn();
  const todoContextValue = {
    isCreatingSubtask: false,
    updatingTodoStatusId: null,
    updatingSubtaskStatusId: null,
    onCreateSubtask: mockOnCreateSubtask,
    onUpdateSubtaskStatus: mockOnUpdateSubtaskStatus,
  } as unknown as ITodoContext;

  beforeEach(() => {
    jest
      .spyOn(TodoContext, 'useTodoContext')
      .mockImplementation(() => todoContextValue);
  });

  it('renders SubtaskList', () => {
    render(<SubtaskList task={task} />);

    const checkBoxes = screen.getAllByRole('checkbox');
    const subtask1 = screen.getByText(/Subtask 1/i);
    const subtask2 = screen.getByText(/Subtask 2/i);
    const form = screen.getByRole('form');
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    expect(checkBoxes).toHaveLength(2);
    expect(checkBoxes[0]).not.toBeChecked();
    expect(checkBoxes[1]).toBeChecked();
    expect(subtask1).toHaveTextContent(task.subtasks[0].title);
    expect(subtask2).toHaveTextContent(task.subtasks[1].title);
    expect(form).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'What are the steps?');
    expect(buttonElement).toHaveTextContent('New Step');
  });

  it('calls onCreateSubtask when a new subtask is submitted', async() => {
    const { user } = setup(<SubtaskList task={task} />);

    const newSubtaskTitle = 'New Subtask';
    const input = screen.getByPlaceholderText('What are the steps?');
    const submitButton = screen.getByText('New Step');

    await user.type(input, newSubtaskTitle)
    await user.click(submitButton);

    expect(mockOnCreateSubtask).toHaveBeenCalledTimes(1);
    expect(mockOnCreateSubtask).toHaveBeenCalledWith(task.id, newSubtaskTitle);
  });

  it('calls onUpdateSubtaskStatus when a subtask checkbox is clicked', async() => {
    const { user } = setup(<SubtaskList task={task} />);

    const checkbox = screen.getAllByRole('checkbox')[0];

    await user.click(checkbox);

    expect(mockOnUpdateSubtaskStatus).toHaveBeenCalledTimes(1);
    expect(mockOnUpdateSubtaskStatus).toHaveBeenCalledWith(1, 'completed');
  });
});
