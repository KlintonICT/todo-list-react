import { Card, Checkbox, Spin } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTodoContext } from '@/context/todo';
import { ITask } from '@/types/todo';
import { getStatus } from '@/utils/helper';

import Form from '@/components/Form';

interface SubtaskListProps {
  task: ITask;
}

const SubtaskList = ({ task }: SubtaskListProps) => {
  const {
    isCreatingSubtask,
    updatingTodoStatusId,
    onCreateSubtask,
    updatingSubtaskStatusId,
    onUpdateSubtaskStatus,
  } = useTodoContext();

  const onSubmitNewSubtask = (title: string) => {
    onCreateSubtask(task.id, title);
  };

  const onClickCheckbox = (event: CheckboxChangeEvent, id: number) => {
    const checkValue = event.target.checked;
    onUpdateSubtaskStatus(id, getStatus(checkValue));
  };

  return (
    <>
      {task.subtasks.map((item) => (
        <Card key={item.id} className="mb-4">
          <div className="flex gap-4 items-center">
            <Spin
              size="small"
              spinning={
                updatingTodoStatusId === task.id ||
                updatingSubtaskStatusId === item.id
              }
            >
              <Checkbox
                onChange={(e) => onClickCheckbox(e, item.id)}
                checked={item.status === 'completed'}
              />
            </Spin>
            <p>{item.title}</p>
          </div>
        </Card>
      ))}
      <div className="mt-6">
        <Form
          btnContent="New Step"
          placeholder="What are the steps?"
          onSubmit={onSubmitNewSubtask}
          isLoading={isCreatingSubtask}
          name={`subtask-form-${task.id}`}
        />
      </div>
    </>
  );
};

export default SubtaskList;
