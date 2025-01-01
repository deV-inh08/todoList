import React from 'react'
import style from './Task.module.scss'
import { TaskType } from '../../types/Task.type';
import PropTypes from 'prop-types';

interface Props {
  task: TaskType
  onChangeCheck: (id: string, isDone: boolean) => void
  onEditTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

const Task = ({ task, onChangeCheck, onEditTask, onDeleteTask}: Props) => {
  
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
      {!task.isDone && (
         <div className={style.taskButtonBlock}>
         <button onClick={() => onEditTask(task.id)} className='editTask'>🖊️</button>
         <button onClick={() => onDeleteTask(task.id)} className='removeTask'>🗑️</button>
       </div>
      )}
    </div>
  )
};

Task.propTypes = {
  task: 
    PropTypes.shape({
      id: PropTypes.string.isRequired, 
      taskName: PropTypes.string.isRequired, 
      isDone: PropTypes.bool.isRequired,      
    }),
  onEditTask: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
}

export default Task;
