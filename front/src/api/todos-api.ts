import { Todo, TodosArr } from '../types';
import { APIResponseType, axiosInstance } from './api';

export const todosAPI = {
  getAllTodos() {
    return axiosInstance.get<APIResponseType<TodosArr>>('/todos')
      .then(response =>  response.data.data)
  },
  getTodo(id: number) {
    return axiosInstance.get<Todo>(`/todos/${id}`)
      .then(response => response.data)
  },
  updateTodo(id: number, newTitle: string) {
    return axiosInstance.put<Todo>(`/todos/${id}`, { title: newTitle })
      .then(response => response.data)
  },
  deleteTodo(id: number) {
    return axiosInstance.delete<Todo>(`/todos/${id}`)
      .then(response => response.data)
  },
  addTodo(title: string) {
    return axiosInstance.post<Todo>('/todos', { title })
      .then(response => response.data)
  },
}
