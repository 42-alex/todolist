interface Todo {
  id: string
  title: string
  isDone: boolean
}

interface TodoDTO {
  id: string
  title: string
  isDone: boolean
}

interface TodosArr extends Array<Todo> {}

export type {
  Todo,
  TodoDTO,
  TodosArr
}