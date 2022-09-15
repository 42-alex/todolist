import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { todosAPI } from '../../api/todos-api';
import { TodosArr } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import { setTodos } from '../../redux/todo-reducer';
import { AxiosError } from 'axios';
import { addMessage } from '../../redux/messages-reducer';
import styles from './Home.module.scss';

type useQueryType = {
  error: AxiosError | null
  [propName: string]: any
}

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootStateType) => state.todos)

  const {
    isFetching,
  }: useQueryType = useQuery(
    ['todos'],
    todosAPI.getAllTodos,
    {
      onSuccess: (todosArr: TodosArr ) => {
        dispatch(setTodos(todosArr));
      },
      onError: (error) => {
        dispatch(addMessage({
          text: error?.message || '',
        }));
      },
    });

  return (
    <div className="container">
      {isFetching && <p>Loading...</p>}
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
