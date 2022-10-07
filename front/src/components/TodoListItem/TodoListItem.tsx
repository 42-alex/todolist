import styles from './TodoListItem.module.scss';
import CheckedIcon from './../Icons/CheckedIcon';
import UncheckedIcon from './../Icons/UncheckedIcon';
import { importanceTheme } from '../../constants';
import PencilIcon from './../Icons/PencilIcon';
import BallotXIcon from './../Icons/BallotXIcon';
import React from 'react';
import { Todo } from '../../types';

interface ITodoListItem {
  todo: Todo
  onClick: (id: string, isDone: boolean) => void
  onEdit: (ev: React.MouseEvent<HTMLButtonElement>, todoId: string) => void
  onDelete: (ev: React.MouseEvent<HTMLButtonElement>, todoId: string) => void
}

const TodoListItem = ({ todo, onClick, onEdit, onDelete }: ITodoListItem) => {
  return (
    <div className={styles.todoWrapper} key={todo.id} onClick={() => onClick(todo.id, !todo.isDone)}>
      <li className={styles.todoItem}>
        <div className={styles.todoItemContent}>
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
            onClick={(ev) => onEdit(ev, todo.id)}
          >
            <PencilIcon />
          </button>
          <button
            className={styles.deleteButton}
            title="Delete todo"
            onClick={(ev) => onDelete(ev, todo.id)}
          >
            <BallotXIcon />
          </button>
        </div>
      </li>
    </div>
  );
};

export default TodoListItem;
