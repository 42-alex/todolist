export const TodoImportanceValues = ['ordinary', 'important', 'urgent'] as const;
type TodoImportance = typeof TodoImportanceValues[number];

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
