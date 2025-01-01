import React from 'react'
import Task from '../Task/Task';
import style from './TaskList.module.scss'
import { TaskType } from '../../types/Task.type';

interface Props {
  taskList: TaskType[]
  isDone: boolean
  onChangeCheck: (id: string, isDone: boolean) => void
  onEditTask: (id: string) => void
}

 const TaskList = ({ taskList, isDone, onEditTask, onChangeCheck}: Props) => {
  return (
    <div className={style.taskList }>
      {isDone ? <h2>Finished Task</h2> : <h2>Unfinished Task</h2>}
      {taskList && taskList.map((task) => {
        return (
          <Task onEditTask={onEditTask} onChangeCheck={onChangeCheck} task={task}></Task>
        )
      })}
    </div>
  )
};

export default TaskList;
