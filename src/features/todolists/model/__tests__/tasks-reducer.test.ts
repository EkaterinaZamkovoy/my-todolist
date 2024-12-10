import { addTaskAC, changeTaskStatusAC, deleteTaskAC, tasksReducer, TasksStateType, updateTaskTitleAC } from "../tasks-reducer";
import { deleteTodolistAC } from "../todolists-reducer";


let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistID1: [
      { id: '1', title: 'HTML&CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
    ],
    todolistID2: [
      { id: '1', title: 'Rest API', isDone: true },
      { id: '2', title: 'GraphQL', isDone: false },
    ],
  };
});

// removeTask

test('the correct task must be removed from the correct array', () => {
  const action = deleteTaskAC('todolistID2', '2');
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      { id: '1', title: 'HTML&CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
    ],
    todolistID2: [{ id: '1', title: 'Rest API', isDone: true }],
  });
});

// addTask

test('adding task to correct array', () => {
  const action = addTaskAC('todolistID2', 'CSS');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistID1'].length).toBe(3);
  expect(endState['todolistID2'].length).toBe(3);
  expect(endState['todolistID2'][0].id).toBeDefined();
  expect(endState['todolistID2'][0].title).toBe('CSS');
  expect(endState['todolistID2'][0].isDone).toBe(false);
});

//taskStatus

test('the status of a specific task must be changed', () => {
  const action = changeTaskStatusAC('todolistID1', '1', false);
  const endState = tasksReducer(startState, action);

  expect(endState['todolistID1'][0].isDone).toBe(false);
  expect(endState['todolistID2'][0].isDone).toBe(true);
});

//updateTaskTitle

test('the title of a specific task must be changed', () => {
  const action = updateTaskTitleAC('todolistID1', '1', 'Test');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistID1'][0].title).toBe('Test');
  expect(endState['todolistID2'][0].title).toBe('Rest API');
});

//delete tasks from remote todolist

test('property with todolistId should be deleted', () => {
  const action = deleteTodolistAC('todolistID2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
});
