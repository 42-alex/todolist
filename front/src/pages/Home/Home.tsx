import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { todosAPI } from '../../api/todos-api';
import { TodosArr } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { addMessage } from '../../redux/messages-reducer';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';

type useQueryType = {
  data: TodosArr | undefined,
  error: AxiosError | null
  [propName: string]: any
}

const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const {
    data: todos = [],
    isFetching,
  }: useQueryType = useQuery(
    ['todos'],
    todosAPI.getAllTodos,
    {
      onError: (error) => {
        dispatch(addMessage({
          text: error?.message || '',
        }));
      }
    }
  );

  if (isFetching) {
    return <Loader />
  }

  return (
    <div className="container">
      { todos?.length > 0 &&
        <ul className={styles.todosList}>
          {todos.map(todo => (
            <li key={todo.id}
              className={styles.todosItem}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      }
    </div>
  )
};

export default Home;
