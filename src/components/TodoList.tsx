import { Spin, Collapse, Checkbox } from 'antd';
import type { CollapseProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTodoContext } from '@/context/todo';
import { getStatus } from '@/utils/helper';
import { ITask } from '@/types/todo';

import SubtaskList from './SubtaskList';

const TodoList = () => {
  const {
    isFetchingTodoList,
    todoList,
    updatingTodoStatusId,
    onUpdateTodoStatus,
  } = useTodoContext();

  const onClickCheckbox = (event: CheckboxChangeEvent, id: number) => {
    const checkValue = event.target.checked;
    onUpdateTodoStatus(id, getStatus(checkValue));
  };

  const getCompletionText = (task: ITask): string => {
    const allSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(
      (sub) => sub.status === 'completed'
    ).length;

    return `${completedSubtasks} of ${allSubtasks} completed`;
  };

  const items: CollapseProps['items'] = todoList.map((item) => ({
    key: item.id,
    label: (
      <div className="flex gap-4 items-center">
        <div onClick={(e) => e.stopPropagation()}>
          <Spin size="small" spinning={updatingTodoStatusId === item.id}>
            <Checkbox
              onChange={(e) => onClickCheckbox(e, item.id)}
              checked={item.status === 'completed'}
            />
          </Spin>
        </div>

        <p className="flex-1">{item.title}</p>

        {item.subtasks.length > 0 && (
          <div className="text-right text-xs whitespace-nowrap">
            {getCompletionText(item)}
          </div>
        )}
      </div>
    ),
    children: <SubtaskList task={item} />,
  }));

  return (
    <div className="flex flex-col justify-center mt-6">
      <Spin size="large" spinning={isFetchingTodoList}>
        {!isFetchingTodoList && todoList.length > 0 && (
          <Collapse items={items} expandIconPosition="end" accordion={true} />
        )}
      </Spin>
    </div>
  );
};

export default TodoList;
