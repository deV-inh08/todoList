import React, { useEffect, useState } from 'react'
import { initialTask } from '../constants/Task';
import { TaskType } from '../../types/Task.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { v4 as uuidv4 } from 'uuid';
import style from './TodoList.module.scss'

const TodoList = () => {

  const [task, setTask] = useState<TaskType>(initialTask);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null)


  const filterTaskDone = taskList.filter((task) => task.isDone === true);
  const filterTaskNotDone = taskList.filter((task) => task.isDone !== true);

  const getTask = (taskName: string) => {
    setTask((pre) => ({
      ...pre,
      id: uuidv4(),
      taskName
    }))
  }

  useEffect(() => {
    if(currentTask) {
      setTask(currentTask)
    }
  }, [currentTask])

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(currentTask && !task.isDone) {
      handleEndEditTask()
      setCurrentTask(null)
    } else {
      if(!task.taskName) {
        alert('Taskname is required')
      } else {
        taskList.push(task)
      }
    }
    setTask(initialTask)
  }

  // Update checked
  const handleChecked = (id: string, isDone: boolean) => {
    setTaskList((pre) => {
      const updated = pre.map((task) => {
        if(task.id === id) {
          return {
            ...task,
            isDone
          }
        }
        return task
      })
      return updated
    })
  }

  // Edit Task
  const handleStartEditTask = (id: string) => {
    if(!task.isDone) {
      setTaskList((pre) => {
        pre.some((task) => {
          if(task.id === id) {
            setCurrentTask(task)
          }
        })
        return pre
      })
    }
  };

  const handleEdit = (value: string) => {
    setCurrentTask((pre) => {
      if(pre) {
        return (
          {
            ...pre,
            taskName: value
          }
        )
      }
      return pre
    })
  };

  const handleEndEditTask = () => {
    if(currentTask) {
      setTaskList((pre) => {
        pre.some((task, index) => {
          if(task.id === currentTask?.id) {
            pre[index] = currentTask
          }
        })
        return pre
      })
    }
  }

  const handleDeleteTask = (id: string) => {
    if(currentTask) {
      setCurrentTask(null)
    }
    const findIndex = taskList.findIndex((task) => task.id === id)
    if(findIndex !== -1) {
      taskList.splice(findIndex, 1)
      const result = [...taskList]
      setTaskList(result)
    }
  };

  return (
   <section className={style.todoList}>
    <TaskInput onEdit={handleEdit} currentTask={currentTask} value={task.taskName} onSubmit={handlesubmit} onGetTask={getTask}></TaskInput>
    <TaskList isDone={false} onChangeCheck={handleChecked} onDeleteTask={handleDeleteTask} onEditTask={handleStartEditTask} taskList={filterTaskNotDone}></TaskList>
    <TaskList isDone={true} onChangeCheck={handleChecked} onDeleteTask={handleDeleteTask} onEditTask={handleStartEditTask} taskList={filterTaskDone}></TaskList>
   </section>
  )
};

export default TodoList;
