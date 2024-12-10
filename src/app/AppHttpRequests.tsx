import React, { ChangeEvent, useEffect, useState } from 'react';
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';
import axios from 'axios';
import { Todolist } from '../features/todolists/api/todolistsApi.types';
import { todolistsApi } from '../features/todolists/api/todolistsApi';
import { BaseResponse } from '../common/types/types';
import { TaskStatus } from '../common/enums/enums';
import { AddItemForm } from 'common/components';
import {
  DomainTask,
  UpdateTaskModel,
} from 'features/todolists/api/tasksApi.types';
import { tasksApi } from 'features/todolists/api/tasksApi';

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
      const newTodolists = res.data;
      setTodolists(newTodolists);
      newTodolists.forEach(tl => {
        tasksApi.getTasks(tl.id).then(res => {
          setTasks(tasks => ({ ...tasks, [tl.id]: res.data.items }));
        });
      });
    });
  }, []);

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then(res => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
    });
  };

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      const newTodolists = todolists.filter(tl => tl.id !== id);
      setTodolists(newTodolists);
    });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then(res => {
      setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, title } : tl)));
    });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask(title, todolistId).then(res => {
      const newTask = res.data.data.item;
      setTasks({
        ...tasks,
        [todolistId]: [newTask, ...(tasks[todolistId] || [])],
      });
    });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask(taskId, todolistId).then(() => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
      });
    });
  };

  const changeTaskStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    task: DomainTask,
    todolistId: string
  ) => {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status: status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    tasksApi.changeTaskStatus(e, task, todolistId).then(res => {
      const newTask = res.data.data.item;
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map(t =>
          t.id === task.id ? newTask : t
        ),
      });
    });
  };

  const changeTaskTitleHandler = (
    title: string,
    task: DomainTask,
    todolistId: string
  ) => {
    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    tasksApi.changeTaskTitle(title, task, todolistId).then(res => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map(t =>
          t.id === task.id ? { ...t, title } : t
        ),
      });
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map(tl => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan
                value={tl.title}
                onChange={(title: string) =>
                  updateTodolistHandler(tl.id, title)
                }
                className='editableSpan'
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <input
                      className='checkbox'
                      type='checkbox'
                      checked={task.status === 2 ? true : false}
                      onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={title =>
                        changeTaskTitleHandler(title, task, tl.id)
                      }
                      className='editableSpan'
                    />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>
                      x
                    </button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};
