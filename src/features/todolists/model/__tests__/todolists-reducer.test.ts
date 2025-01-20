import { v1 } from 'uuid';
import {
  addTodolist,
  changeTodolistFilter,
  deleteTodolist,
  DomainTodolist,
  todolistsReducer,
  updateTodolistTitle,
} from '../todolistSlice';
import { Todolist } from 'features/todolists/api/todolistsApi.types';

let todolistID1: string;
let todolistID2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    {
      id: todolistID1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: todolistID2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
  ];
});

//delete-todolist

test('correct todolist should be deleted', () => {
  const endState = todolistsReducer(startState, deleteTodolist({id: todolistID1}));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

//add-todolist

test('correct todolist should be added', () => {
  const todolist: Todolist = {
    title: 'New Todolist',
    id: 'any id',
    addedDate: '',
    order: 0,
  };

  const endState = todolistsReducer(startState, addTodolist({todolist}));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[0].filter).toBe('all');
});

//change-filter

test('correct todolist should be filtered', () => {
  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: 'completed',
    todolistId: todolistID2,
  } as const;

  const endState = todolistsReducer(
    startState,
    changeTodolistFilter({ todolistId: todolistID2, filter: 'completed' })
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(action.filter);
});

//change-title

test('correct todolist should be title changed', () => {
  const action = {
    type: 'UPDATE-TODOLIST-TITLE',
    title: 'New Todolist Title',
    todolistId: todolistID2,
  } as const;

  const endState = todolistsReducer(
    startState,
    updateTodolistTitle({ id: todolistID2, title: 'New Todolist' })
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(action.title);
});
