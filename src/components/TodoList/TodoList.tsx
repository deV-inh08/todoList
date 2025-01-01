import React, { useState } from 'react'
import { initialTask } from '../constants/Task';
import { TaskType } from '../../types/Task.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { v4 as uuidv4 } from 'uuid';
import style from './TodoList.module.scss'

const TodoList = () => {

  const [task, setTask] = useState<TaskType>(initialTask);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);


  const filterTaskDone = taskList.filter((task) => task.isDone === true);
  const filterTaskNotDone = taskList.filter((task) => task.isDone !== true);

  const getTaskList = (taskName: string) => {
    setTask((pre) => ({
      ...pre,
      id: uuidv4(),
      taskName
    }))
  }

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!task.taskName) {
      alert('Taskname is required')
    } else {
      taskList.push(task)
    }
    setTask(initialTask)
  }

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



  return (
   <section className={style.todoList}>
    <TaskInput value={task.taskName} onSubmit={handlesubmit} onGetTaskList={getTaskList}></TaskInput>
    <TaskList isDone={isDone}  onChangeCheck={handleChecked} taskList={filterTaskNotDone}></TaskList>
    <TaskList isDone={isDone} onChangeCheck={handleChecked} taskList={filterTaskDone}></TaskList>
   </section>
  )
};

export default TodoList;
