import { Input, Button, Form } from 'antd';

import { useTodoContext } from '@/context/todo';

interface FormValue {
  title: string;
}

const App = () => {
  const [todoForm] = Form.useForm();
  const { isCreatingTodo, todoList, onCreateTodo } = useTodoContext();

  const onFinish = (values: FormValue) => {
    const { title } = values;
    if (title) {
      onCreateTodo(title);
      todoForm.resetFields();
    }
  };

  console.log(todoList);

  return (
    <div className="w-full p-10">
      <Form
        form={todoForm}
        name="todo-form"
        className="max-w-[600px] w-full mx-auto mt-4"
        onFinish={onFinish}
      >
        <h1 className="text-3xl font-medium text-center">Todo App</h1>
        <div className="my-4 flex gap-4 items-center justify-between">
          <Form.Item name="title" className="w-full my-0">
            <Input placeholder="What to do?" />
          </Form.Item>
          <Button
            type="primary"
            className="bg-primary"
            htmlType="submit"
            loading={isCreatingTodo}
          >
            New List
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default App;
