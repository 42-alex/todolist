type TodoImportance =  'ordinary' | 'important' | 'urgent';

interface Todo {
  id: string
  title: string
  importance: TodoImportance
  isDone: boolean
}

export {
  Todo,
  TodoImportance
}