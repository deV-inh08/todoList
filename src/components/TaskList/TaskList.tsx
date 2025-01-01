import React from 'react'
import Task from '../Task/Task';
import style from './TaskList.module.scss'
import { TaskType } from '../../types/Task.type';
import PropTypes from 'prop-types';

interface Props {
  taskList: TaskType[]
  isDone: boolean
  onChangeCheck: (id: string, isDone: boolean) => void
  onEditTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

 const TaskList = ({ taskList, isDone, onEditTask, onChangeCheck, onDeleteTask}: Props) => {
  return (
    <div className={style.taskList }>
      {isDone ? <h2>Finished Task</h2> : <h2>Unfinished Task</h2>}
      {taskList && taskList.map((task) => {
        return (
          <Task onEditTask={onEditTask} onChangeCheck={onChangeCheck} onDeleteTask={onDeleteTask} task={task}></Task>
        )
      })}
    </div>
  )
};


TaskList.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, 
      taskName: PropTypes.string.isRequired, 
      isDone: PropTypes.bool.isRequired,
    })
  ),
  isDone: PropTypes.bool.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
}

export default TaskList;
