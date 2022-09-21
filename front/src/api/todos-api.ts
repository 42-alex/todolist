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
  updateTodo(id: number, newTitle: string, newImportance: string, newIsDone: boolean) {
    return axiosInstance.put<Todo>(
      `/todos/${id}`,
      {
        title: newTitle,
        importance: newImportance,
        isDone: newIsDone
      })
      .then(response => {
        const todoDTO = parseTodoDTO(response.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
  deleteTodo(id: number) {
    return axiosInstance.delete<Todo>(`/todos/${id}`)
      .then(response => {
        const todoDTO = parseTodoDTO(response.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
  addTodo(title: string, importance: string) {
    return axiosInstance.post<Todo>('/todos', { title, importance })
      .then(response => {
        const todoDTO = parseTodoDTO(response.data);
        const todo = fromDTO(todoDTO);

        return todo;
      })
  },
}
