import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todosAPI } from '../api/todos-api';
import { TodosArr } from '../types';
import { AxiosError } from 'axios';
import { addMessage } from '../redux/messages-reducer';
import useAppDispatch from './useAppDispatch';

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(
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
};

export default useUpdateTodo;
