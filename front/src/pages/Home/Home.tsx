import React from 'react';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';
import { importanceTheme } from '../../constants';
import useUpdateTodo from '../../hooks/useUpdateTodo';
import useFetchTodos from '../../hooks/useFetchTodos';
import { Link, useNavigate } from 'react-router-dom';
import CheckedIcon from '../../components/Icons/CheckedIcon';
import UncheckedIcon from '../../components/Icons/UncheckedIcon';
import PencilIcon from '../../components/Icons/PencilIcon';
import BallotXIcon from '../../components/Icons/BallotXIcon';


const Home = () => {

  const {
    data: todos = [],
    isFetching,
  } = useFetchTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const navigate = useNavigate()

  const handleTodoClick = (id: string, isDone: boolean) => {
    updateTodo({ id, isDone });
  }

  return (
    <div className="container">
      { isFetching && <Loader /> }

      <h1 className="pageTitle">To-do list</h1>
      { todos.length > 0 &&
        <ul className={styles.todosList}>
          {todos.map(todo => (
            <div className={styles.todoWrapper} key={todo.id} onClick={() => handleTodoClick(todo.id, !todo.isDone)}>
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
                    onClick={() => navigate(`/edit/${todo.id}`)}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    className={styles.deleteButton}
                    title="Delete todo"
                  >
                    <BallotXIcon />
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      }

      <Link
        to="/add"
        className={styles.addButton}
        title="Add new todo"
      >+</Link>
    </div>
  )
}

export default Home;
