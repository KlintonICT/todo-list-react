import { Button } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
};

export interface FormProps {
  onSubmit: (title: string) => void;
  isLoading: boolean;
  btnContent: string;
  placeholder?: string;
  name: string;
}

const TodoForm = ({
  onSubmit,
  isLoading,
  btnContent,
  placeholder,
  name,
}: FormProps) => {
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmitForm: SubmitHandler<FormValues> = (data) => {
    const { title } = data;
    if (title) {
      onSubmit(title);
      reset();
    }
  };

  return (
    <div>
      <form
        name={name}
        className="flex gap-4 items-center justify-between my-4"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <input
          placeholder={placeholder}
          {...register('title')}
          className="border border-border-color rounded-[6px] py-[4px] px-[11px] w-full"
        />
        <Button
          type="primary"
          className="bg-primary"
          htmlType="submit"
          loading={isLoading}
        >
          {btnContent}
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
