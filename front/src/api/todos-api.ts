import { Todo, TodosArr } from '../types';
import { APIResponseType, axiosInstance } from './api';
import { fromDTO, parseTodoDTO } from '../helpers';

export const todosAPI = {
  getAllTodos() {
    return axiosInstance.get<APIResponseType<TodosArr>>('/todos')
      .then(response => {
        const todosArr = response.data.data.map(todo => {
          return fromDTO(parseTodoDTO(todo))
        })

        return todosArr;
      })
  },
  getTodo(id: number) {
    return axiosInstance.get<Todo>(`/todos/${id}`)
      .then(response => {
        const todoDTO = parseTodoDTO(response.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
  updateTodo(newData: { id: string, title?: string, importance?: string, isDone?: boolean }) {
    const { id, title, importance, isDone } = newData;
    return axiosInstance.put<APIResponseType<Todo>>(
      `/todos/${id}`,
      {
        title,
        importance,
        isDone
      })
      .then(response => {
        const todoDTO = parseTodoDTO(response.data.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
  deleteTodo(id: string) {
    return axiosInstance.delete<APIResponseType<Todo>>(`/todos/${id}`)
      .then(response => {
        const todoDTO = parseTodoDTO(response.data.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
  addTodo(newTodo: { title: string, importance: string }) {
    return axiosInstance.post<APIResponseType<Todo>>('/todos', newTodo)
      .then(response => {
        const todoDTO = parseTodoDTO(response.data.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
}
