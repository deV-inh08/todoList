import React from 'react'
import PropTypes from 'prop-types'

import style from './TaskInput.module.scss'
import { TaskType } from '../../types/Task.type'

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  onGetTask: (taskName: string) => void
  value: string
  currentTask: TaskType | null
  onEdit: (value: string) => void
}

const TaskInput = ({ onSubmit, onGetTask, value, currentTask, onEdit }: Props) => {

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(currentTask) {
      onEdit(e.target.value);
    } else {
      onGetTask(e.target.value)
    }
  }
  
  return (
    <form onSubmit={onSubmit} className={style.taskInput}>
      <h1>To Do List Typescript</h1>
      <article>
        <input value={currentTask ? currentTask.taskName : value} onChange={(e) => handleChangeInput(e)} className={style.input} type="text" placeholder='caption goes here' />
        <button type='submit' className={style.buttonAddTask}>
          {currentTask && value ? '✔️ ': '➕' }
        </button>
      </article>
    </form>
  )
};


TaskInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onGetTask: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  currentTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired
  }),
  onEdit:  PropTypes.func.isRequired,
}

export default TaskInput
