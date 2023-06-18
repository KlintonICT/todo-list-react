import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm, { FormProps } from '../Form';

function setup(jsx: any) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('TodoForm', () => {
  const onSubmitMock = jest.fn();
  const props: FormProps = {
    onSubmit: onSubmitMock,
    isLoading: false,
    btnContent: 'Submit',
    placeholder: 'What to do?',
    name: 'todoForm',
  };

  beforeEach(() => {
    onSubmitMock.mockClear();
  });

  it('renders the form', () => {
    render(<TodoForm {...props} />);

    const form = screen.getByRole('form')
    const inputElement = screen.getByRole('textbox')
    const buttonElement = screen.getByRole('button');

    expect(form).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onSubmit with the entered title when the form is submitted', async () => {
    const { user } = setup(<TodoForm {...props} />);

    const inputElement = screen.getByRole('textbox')
    const buttonElement = screen.getByRole('button');

    const title = 'Todo1';
    await user.type(inputElement, title)
    await user.click(buttonElement)

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(title);
  });

  it('resets the form after successful submission', async () => {
    const { user } = setup(<TodoForm {...props} />);

    const inputElement = screen.getByRole('textbox')
    const buttonElement = screen.getByRole('button');

    const title = 'Todo1';
    await user.type(inputElement, title)
    await user.click(buttonElement)

    expect(inputElement).toHaveValue('');
  });
});
