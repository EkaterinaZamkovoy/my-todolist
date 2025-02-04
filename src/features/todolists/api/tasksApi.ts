import { DomainTask, GetTaskResponse, UpdateTaskModel } from './tasksApi.types';
import { BaseResponse } from 'common/types';
import { baseApi } from 'app/baseApi';

export const PAGE_SIZE = 4;

export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<
      GetTaskResponse,
      { todolistId: string; args: { count: number; page: number } }
    >({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE };

        return {
          method: 'GET',
          url: `todo-lists/${todolistId}/tasks`,
          params,
        };
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
              ...res.items.map(({ id }) => ({ type: 'Task', id } as const)),
              { type: 'Task', id: todolistId },
            ]
          : ['Task'],
    }),
    addTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => {
        return {
          method: 'POST',
          url: `todo-lists/${todolistId}/tasks`,
          body: {
            title,
          },
        };
      },
      invalidatesTags: (result, error, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
    removeTask: build.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => {
        return {
          method: 'DELETE',
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
        };
      },
      invalidatesTags: (result, error, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => {
        return {
          method: 'PUT',
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        };
      },
      invalidatesTags: (result, error, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
