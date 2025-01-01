import React from 'react'
import style from './Task.module.scss'
import { TaskType } from '../../types/Task.type';

interface Props {
  task: TaskType
  onChangeCheck: (id: string, isDone: boolean) => void
}

const Task = ({ task, onChangeCheck }: Props) => {
  
  return (
    <div className={style.task}>
      <div className={style.taskNameBlock}>
        <input 
          id={task.id}
          type="checkbox" 
          checked={task.isDone}
          onChange={(e) => {onChangeCheck(task.id, e.target.checked)}}
        />
        {
          !task.isDone 
            ? (
             <label htmlFor={task.id} className={style.taskName}>{task.taskName}</label>
            )
            : (
              <label htmlFor={task.id} className={style.taskNameDone}>{task.taskName}</label>
            )
        }
      </div>
      <div className={style.taskButtonBlock}>
        <button className='editTask'>🖊️</button>
        <button className='removeTask'>🗑️</button>
      </div>
    </div>
  )
};

export default Task;
