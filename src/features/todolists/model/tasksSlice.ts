import { addTodolist, deleteTodolist } from './todolistSlice';
import { AppDispatch, AppRootStateType } from 'app/store';
import { _tasksApi, tasksApi } from '../api/tasksApi';
import {
  DomainTask,
  UpdateTaskDomainModel,
  UpdateTaskModel,
} from '../api/tasksApi.types';
import { setAppStatus } from 'app/appSlice';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { createSlice } from '@reduxjs/toolkit';

export type TasksStateType = {
  [key: string]: DomainTask[];
};

const initialState: TasksStateType = {};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>(
      (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      }
    ),
    deleteTask: create.reducer<{ taskId: string; todolistId: string }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(tl => tl.id === action.payload.taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      }
    ),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{
      taskId: string;
      todolistId: string;
      domainModel: UpdateTaskDomainModel;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(tl => tl.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    }),
    clearTasks: create.reducer(() => {
      return {};
    }),
  }),

  extraReducers: builder => {
    builder
      // 1 аргумент - action creator, который мы хотим обработать
      // 2 аргумент - reducer, в котором изменяем state
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id];
      });
  },
  selectors: {
    selectTasks: state => state,
  },
});

// Thunk

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    _tasksApi
      .getTasks(todolistId)
      .then(res => {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(setTasks({ todolistId, tasks: res.data.items }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const deleteTaskTC =
  (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    _tasksApi
      .removeTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(deleteTask(arg));
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
    _tasksApi
      .createTask(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }));
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

      _tasksApi
        .updateTask({ taskId, todolistId, model })
        .then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTask(arg));
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

export const { setTasks, deleteTask, updateTask, clearTasks, addTask } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;
