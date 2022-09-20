interface Todo {
  id: string
  title: string
  isDone: boolean
}

interface TodoDTO extends Todo {}

interface TodosArr extends Array<Todo> {}

export type {
  Todo,
  TodoDTO,
  TodosArr
}