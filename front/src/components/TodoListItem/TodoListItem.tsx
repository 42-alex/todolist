import React from 'react';
import CheckedIcon from './../Icons/CheckedIcon';
import UncheckedIcon from './../Icons/UncheckedIcon';
import PencilIcon from './../Icons/PencilIcon';
import BallotXIcon from './../Icons/BallotXIcon';
import { Todo } from '../../types';
import { importanceTheme } from '../../constants';
import styles from './TodoListItem.module.scss';

interface ITodoListItem {
  todo: Todo
  onClick: (id: string, isDone: boolean) => void
  onEdit: (todoId: string) => void
  onDelete: (todoId: string) => void
}

const TodoListItem = ({ todo, onClick, onEdit, onDelete }: ITodoListItem) => {

  const handleItemClick = () => onClick(todo.id, !todo.isDone);

  const handleItemEdit = () => onEdit(todo.id);

  const handleItemDelete = () => onDelete(todo.id);

  return (
    <div className={styles.todoWrapper}>
      <li className={styles.todoItem}>
        <div className={styles.todoItemContent} onClick={handleItemClick}>
                  <span className={styles.checkIcon}>
                    {todo.isDone ? <CheckedIcon /> : <UncheckedIcon />}
                  </span>
          <div className="todoTitle">
            {todo.title}
          </div>
          { todo.importance !== 'ordinary' &&
          <div className={`${styles.ribbon} ${styles.ribbonTopRight}`}>
            <span style={{backgroundColor: importanceTheme[todo.importance]}}>{todo.importance}</span>
          </div>
          }
        </div>
        <div className={styles.todoItemActions}>
          <button
            className={styles.editButton}
            title="Edit todo"
            onClick={handleItemEdit}
          >
            <PencilIcon />
          </button>
          <button
            className={styles.deleteButton}
            title="Delete todo"
            onClick={handleItemDelete}
          >
            <BallotXIcon />
          </button>
        </div>
      </li>
    </div>
  );
};

export default TodoListItem;
