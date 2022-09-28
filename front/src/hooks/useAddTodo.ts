import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todosAPI } from '../api/todos-api';
import { TodosArr, TodoToCreate } from '../types';
import useAppDispatch from './useAppDispatch';
import { addMessage } from '../redux/messages-reducer';
import { AxiosError } from 'axios';

const useAddTodo = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(
    (newTodo: TodoToCreate) => todosAPI.addTodo(newTodo),
    {
      onMutate: async (newTodo: TodoToCreate) => {
        await queryClient.cancelQueries(['todos', newTodo]);
        const previousTodos = queryClient.getQueryData<TodosArr>(['todos']);
        if (previousTodos) {
          queryClient.setQueryData<TodosArr>(
            ['todos'],
            [
              ...previousTodos,
                {
                  ...newTodo,
                  id: Math.random().toString(),
                  isDone: false,
                }
              ]
            )
        }

        return { previousTodos };
      },
      onError: (err: AxiosError, variables, context) => {
        dispatch(addMessage({
          text: `${err.message}. Todo was not added`
        }))
        if (context?.previousTodos) {
          queryClient.setQueryData<TodosArr>(['todos'], context.previousTodos)
        }
      },
      onSettled: (createdTodo) => {
        const todoName = createdTodo?.title ? `"${createdTodo.title}"` : '';
        dispatch(addMessage({
          type: 'success',
          text: `Todo ${todoName} was successfully added`
        }))
        queryClient.invalidateQueries(['todos'])
        resetForm();
      },
    }
  )
}

export default useAddTodo;
