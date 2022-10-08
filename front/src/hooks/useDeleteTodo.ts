import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todosAPI } from '../api/todos-api';
import { TodosArr } from '../types';
import { AxiosError } from 'axios';
import useAppDispatch from './useAppDispatch';
import { addMessage } from '../redux/messages-reducer';

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(
    (todoId: string) => todosAPI.deleteTodo(todoId),
    {
      onMutate: async (todoId) => {
        await queryClient.cancelQueries(['todos']);
        const previousTodos = queryClient.getQueryData<TodosArr>(['todos'])
        queryClient.setQueryData<TodosArr>(
          ['todos'],
          (oldTodosArr = []) => oldTodosArr.filter(todo => todo.id !== todoId)
        )

        return { previousTodos }
      },
      onError: (error: AxiosError, todoId, context) => {
        dispatch(addMessage({ text: `${error?.message}. Todo was not deleted` }))

        // rollback previous local state of todos
        queryClient.setQueryData<TodosArr>(
          ['todos'],
          context?.previousTodos
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(['todos']);
      }
    })
}

export default useDeleteTodo;
