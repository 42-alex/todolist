import React from 'react';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';
import useUpdateTodo from '../../hooks/useUpdateTodo';
import useFetchTodos from '../../hooks/useFetchTodos';


const Home = () => {

  const {
    data: todos = [],
    isFetching,
  } = useFetchTodos();
  const { mutate: updateTodo } = useUpdateTodo();

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
              <span className={styles.checkIcon}>
                {todo.isDone ? <i>&#9745;</i> : <i>&#9744;</i>}
              </span>
              <li className={styles.todoItem}>
                {todo.title}
              </li>
            </div>
          ))}
        </ul>
      }
    </div>
  )
};

export default Home;
