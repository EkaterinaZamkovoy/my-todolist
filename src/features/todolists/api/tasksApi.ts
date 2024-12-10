import { instance } from 'common/instance/instance';
import { DomainTask, GetTaskResponse, UpdateTaskModel } from './tasksApi.types';
import { BaseResponse } from 'common/types';
import { ChangeEvent } from 'react';
import { TaskStatus } from 'common/enums/enums';

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(title: string, todolistId: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title,
      }
    );
  },
  removeTask(taskId: string, todolistId: string) {
    return instance.delete<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  changeTaskTitle(title: string, task: DomainTask, todolistId: string) {
    const model: UpdateTaskModel = {
      ...task,
      title,
    };
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks/${task.id}`,
      model
    );
  },
  changeTaskStatus(
    e: ChangeEvent<HTMLInputElement>,
    task: DomainTask,
    todolistId: string
  ) {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;
    const model: UpdateTaskModel = {
      ...task,
      status,
    };
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks/${task.id}`,
      model
    );
  },
};
