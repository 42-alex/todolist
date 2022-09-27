import { useQuery } from '@tanstack/react-query';
import { TodosArr } from '../types';
import { AxiosError } from 'axios';
import { todosAPI } from '../api/todos-api';
import { addMessage } from '../redux/messages-reducer';
import useAppDispatch from './useAppDispatch';


const useFetchTodos = () => {
  const dispatch = useAppDispatch();

  return useQuery<TodosArr, AxiosError>(
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
}

export default useFetchTodos;
