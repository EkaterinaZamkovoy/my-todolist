import {} from './todolistSlice';
import { AppDispatch, AppRootStateType } from 'app/store';
import { tasksApi } from '../api/tasksApi';
import {
  DomainTask,
  UpdateTaskDomainModel,
  UpdateTaskModel,
} from '../api/tasksApi.types';
import { setAppStatus } from 'app/appSlice';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';

export type TasksStateType = {
  [key: string]: DomainTask[];
};

// Actions types

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

export type SetTasksActionCreator = ReturnType<typeof setTasksAC>;

type ActionsType = any;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }
    case 'DELETE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]?.filter(
          t => t.id !== action.payload.taskId
        ),
      };
    }
    case 'ADD-TASK': {
      const newTask = action.payload.task;
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      };
    }

    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.domainModel,
              }
            : t
        ),
      };
    }

    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };

    case 'DELETE-TODOLIST': {
      let copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    }

    default:
      return state;
  }
};

// Action creators

export const setTasksAC = (payload: {
  todolistId: string;
  tasks: DomainTask[];
}) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const;
};

export const deleteTaskAC = (payload: {
  taskId: string;
  todolistId: string;
}) => {
  return { type: 'DELETE-TASK', payload } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: 'ADD-TASK', payload } as const;
};

export const updateTaskAC = (payload: {
  taskId: string;
  todolistId: string;
  domainModel: UpdateTaskDomainModel;
}) => {
  return {
    type: 'UPDATE-TASK',
    payload,
  } as const;
};

// Thunk

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    tasksApi.getTasks(todolistId).then(res => {
      dispatch(setAppStatus({ status: 'succeeded' }));
      const tasks = res.data.items;
      dispatch(setTasksAC({ todolistId, tasks }));
    });
  };
};

export const deleteTaskTC =
  (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    tasksApi
      .removeTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(deleteTaskAC(arg));
          dispatch(setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTaskTC =
  (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    tasksApi
      .createTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTaskAC({ task: res.data.data.item }));
          dispatch(setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (arg: {
    taskId: string;
    todolistId: string;
    domainModel: UpdateTaskDomainModel;
  }) =>
  (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus({ status: 'loading' }));
    const { taskId, todolistId, domainModel } = arg;

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find(t => t.id === taskId);

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      };

      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTaskAC(arg));
            dispatch(setAppStatus({ status: 'succeeded' }));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch(error => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
