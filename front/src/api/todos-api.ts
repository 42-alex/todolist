import { Todo, TodosArr } from '../types';
import { axiosInstance } from './api';

export const todosAPI = {
  getAllTodos() {
    return axiosInstance.get<TodosArr>('/todos')
      .then(response => response.data)
      .catch(e => e.message)
  },
  getTodo(id: number) {
    return axiosInstance.get<Todo>(`/todos/${id}`)
      .then(response => response.data)
      .catch(e => e.message)
  },
  updateTodo(id: number, newTitle: string) {
    return axiosInstance.put<Todo>(`/todos/${id}`, { title: newTitle })
      .then(response => response.data)
      .catch(e => e.message)
  },
  deleteTodo(id: number) {
    return axiosInstance.delete<Todo>(`/todos/${id}`)
      .then(response => response.data)
      .catch(e => e.message)
  },
  addTodo(title: string) {
    return axiosInstance.post<Todo>('/todos', { title })
      .then(response => response.data)
      .catch(e => e.message)
  },
}
