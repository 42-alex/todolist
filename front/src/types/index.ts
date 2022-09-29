import { importanceValues } from '../constants';

type TodoImportance = keyof typeof importanceValues;  // 'ordinary' | 'important' | 'urgent'

interface Todo {
  id: string
  title: string
  importance: TodoImportance
  isDone: boolean
}
interface TodoToCreate extends Omit<Todo, 'id' | 'isDone'> {}

interface TodoDTO extends Todo {}

interface TodosArr extends Array<Todo> {}

export type {
  Todo,
  TodoToCreate,
  TodosArr,
  TodoDTO,
  TodoImportance,
}
