import { Spin, Collapse, Checkbox } from 'antd';
import type { CollapseProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTodoContext } from '@/context/todo';
import {getStatus} from '@/utils/helper'

const TodoList = () => {
  const { isFetchingTodoList, todoList } = useTodoContext();

  const onClickCheckbox = (event: CheckboxChangeEvent) => {
    console.log(getStatus(event.target.checked));
  };

  const items: CollapseProps['items'] = todoList.map((item) => ({
    key: item.id,
    label: (
      <div className="flex gap-4">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox onChange={onClickCheckbox} />
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
