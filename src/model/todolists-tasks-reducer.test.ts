import { tasksReducer, TasksStateType } from './tasks-reducer';
import {
  addTodolistAC,
  todolistsReducer,
  TodolistType,
} from './todolists-reducer';

test('ids must be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = addTodolistAC('New todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
