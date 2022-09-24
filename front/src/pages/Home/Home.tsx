import React from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { todosAPI } from '../../api/todos-api';
import { TodosArr } from '../../types';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { addMessage } from '../../redux/messages-reducer';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';


const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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

  const updateTodoMutation = useMutation(
    (updatedTodo: {id: string, isDone: boolean}) => todosAPI.updateTodo(updatedTodo),
    {
      onMutate: async (updatedTodo: {id: string, isDone: boolean}) => {
        await queryClient.cancelQueries(['todos']);
        const previousTodos = queryClient.getQueryData<TodosArr>(['todos']);
        if (previousTodos) {
          queryClient.setQueryData<TodosArr>(
            ['todos'],
            previousTodos.map(todo => {
              if (todo.id === updatedTodo.id) {
                return { ...todo, isDone: updatedTodo.isDone }
              }
              return todo;
            })
          )
        }

        return { previousTodos }
      },
      onError: (error: AxiosError, variables, context) => {
        dispatch(addMessage({ text: error.message }))

        // rollback previous local state of todos
        if (context?.previousTodos) {
          queryClient.setQueryData<TodosArr>(
            ['todos'],
            context.previousTodos
          )
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )

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
