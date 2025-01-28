import { Todolist } from './todolistsApi.types';
import { instance } from '../../../common/instance/instance';
import { BaseResponse } from '../../../common/types/types';
import { baseApi } from 'app/baseApi';
import { DomainTodolist } from '../lib/types/types';

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => {
          return {
            url: 'todo-lists',
            method: 'GET',
          };
        },
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map(tl => ({
            ...tl,
            filter: 'all',
            entityStatus: 'idle',
          }));
        },
        providesTags: ['Todolist'],
      }),
      addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: title => {
          return {
            url: 'todo-lists',
            method: 'POST',
            body: { title },
          };
        },
        invalidatesTags: ['Todolist'],
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
        query: id => {
          return {
            url: `todo-lists/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Todolist'],
      }),
      updateTodolistTitle: build.mutation<
        BaseResponse,
        { id: string; title: string }
      >({
        query: ({ id, title }) => {
          return {
            url: `todo-lists/${id}`,
            method: 'PUT',
            body: { title },
          };
        },
        invalidatesTags: ['Todolist'],
      }),
    };
  },
});

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists');
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', {
      title,
    });
  },
  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  },
};
