import { Todo } from '../types';

export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'To buy meat',
    importance: 'ordinary',
    isDone: true
  },
  {
    id: '2',
    title: 'To learn TypeScript',
    importance: 'important',
    isDone: false
  },
  {
    id: '3',
    title: 'To write todo app',
    importance: 'urgent',
    isDone: false
  }
]