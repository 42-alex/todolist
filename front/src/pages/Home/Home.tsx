import React from 'react';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';
import { importanceTheme } from '../../constants';
import useUpdateTodo from '../../hooks/useUpdateTodo';
import useFetchTodos from '../../hooks/useFetchTodos';
import { Link, useNavigate } from 'react-router-dom';


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
      { todos.length > 0 &&
        <ul className={styles.todosList}>
          {todos.map(todo => (
            <div className={styles.todoWrapper} key={todo.id} onClick={() => handleTodoClick(todo.id, !todo.isDone)}>
              <li className={styles.todoItem}>
                <div className={styles.todoItemContent}>
                  <span className={styles.checkIcon}>
                    {todo.isDone ? <i>&#9745;</i> : <i>&#9744;</i>}
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
                  >&#9998;</button>
                  <button
                    className={styles.deleteButton}
                    title="Delete todo"
                  >&#10008;</button>
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
