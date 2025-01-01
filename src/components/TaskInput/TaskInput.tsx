import React from 'react'

import style from './TaskInput.module.scss'

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  onGetTaskList: (taskName: string) => void
  value: string
}

const TaskInput = ({ onSubmit, onGetTaskList, value }: Props) => {
  
  return (
    <form onSubmit={onSubmit} className={style.taskInput}>
      <h1>To Do List Typescript</h1>
      <article>
        <input value={value} onChange={(e) => {onGetTaskList(e.target.value)}} className={style.input} type="text" placeholder='caption goes here' />
        <button type='submit' className={style.buttonAddTask}>➕</button>
      </article>
    </form>
  )
};

export default TaskInput
