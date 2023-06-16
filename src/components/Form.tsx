import { Input, Button, Form } from 'antd';

interface FormValue {
  title: string;
}

interface FormProps {
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
  const [form] = Form.useForm();

  const onFinish = (values: FormValue) => {
    const { title } = values;
    if (title) {
      onSubmit(title);
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      name={name}
      className="flex gap-4 items-center justify-between my-4"
      onFinish={onFinish}
    >
      <Form.Item name="title" className="w-full my-0">
        <Input placeholder={placeholder} />
      </Form.Item>
      <Button
        type="primary"
        className="bg-primary"
        htmlType="submit"
        loading={isLoading}
      >
        {btnContent}
      </Button>
    </Form>
  );
};

export default TodoForm;
