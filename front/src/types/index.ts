interface Todo {
  id: string
  title: string
  isDone: boolean
}

interface TodosArr extends Array<Todo> {}

export type {
  TodosArr
}