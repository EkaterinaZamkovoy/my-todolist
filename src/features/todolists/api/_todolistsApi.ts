import { Todolist } from './todolistsApi.types';
import { instance } from '../../../common/instance/instance';
import { BaseResponse } from '../../../common/types/types';
// 1
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DomainTodolist } from '../model/todolistSlice';

// 2
export const todolistsApi = createApi({
  // 3
  reducerPath: 'todolistsApi',
  // 4
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: headers => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`);
      headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('sn-token')}`
      );
    },
  }),
  // 5
  endpoints: build => {
    return {
      // 6
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
      }),
    };
  },
});

// 7
export const { useGetTodolistsQuery } = todolistsApi;

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
