import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { todosAPI } from '../../api/todos-api';
import { TodosArr } from '../../types';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { addMessage } from '../../redux/messages-reducer';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';
import useUpdateTodo from '../../hooks/useUpdateTodo';


const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const {
    data: todos = [],
    isFetching,
  } = useQuery<TodosArr, AxiosError>(
    ['todos'],
    todosAPI.getAllTodos,
    {
      onError: (error) => {
        if (error?.message) {
          dispatch(addMessage({
            text: error.message,
          }));
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const updateTodoMutation = useUpdateTodo();

  const handleTodoClick = (id: string, isDone: boolean) => {
    updateTodoMutation.mutate({ id, isDone });
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
