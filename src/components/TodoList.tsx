import { Spin, Collapse, Checkbox } from 'antd';
import type { CollapseProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTodoContext } from '@/context/todo';
import { getStatus } from '@/utils/helper';

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

  const items: CollapseProps['items'] = todoList.map((item) => ({
    key: item.id,
    label: (
      <div className="flex gap-4 items-center">
        <div onClick={(e) => e.stopPropagation()}>
          <Spin size="small" spinning={updatingTodoStatusId === item.id}>
            <Checkbox
              onChange={(e) => onClickCheckbox(e, item.id)}
              defaultChecked={item.status === 'completed'}
            />
          </Spin>
        </div>
        <p>{item.title}</p>
      </div>
    ),
  }));

  return (
    <Spin size="large" spinning={isFetchingTodoList}>
      <Collapse items={items} expandIconPosition="end" accordion={true} />
    </Spin>
  );
};

export default TodoList;
