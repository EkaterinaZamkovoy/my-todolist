import { instance } from 'common/instance/instance';
import { DomainTask, GetTaskResponse, UpdateTaskModel } from './tasksApi.types';
import { BaseResponse } from 'common/types';
import { baseApi } from 'app/baseApi';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTaskResponse, string>({
      query: todolistId => `todo-lists/${todolistId}/tasks`,
      providesTags: ['Task'],
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
      invalidatesTags: ['Task'],
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
      invalidatesTags: ['Task'],
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
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
