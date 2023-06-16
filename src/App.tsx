import { useTodoContext } from '@/context/todo';
import Form from '@/components/Form';
import TodoList from '@/components/TodoList';

const App = () => {
  const { isCreatingTodo, onCreateTodo } = useTodoContext();

  return (
    <div className="w-full p-10">
      <div className="max-w-[600px] w-full mx-auto">
        <h1 className="text-3xl font-medium text-center mb-4">Todo App</h1>
        <Form
          btnContent="New List"
          onSubmit={onCreateTodo}
          isLoading={isCreatingTodo}
          placeholder="What to do?"
          name="todo-form"
        />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
