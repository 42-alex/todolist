import { Todo, TodoDTO } from '../types'

const parseTodoDTO = (data: {[propName: string]: any}) => {
  const todoDTO = {} as TodoDTO;

  // check id
  if('id' in data) {
    todoDTO.id = data.id;
  } else {
    throw new Error('There is no todo id. I can\'t work without it')
  }

  // check title
  if ('title' in data) {
    todoDTO.title = data.title;
  } else {
    throw new Error(`There is no known key for title in todo with id: ${todoDTO.id}`)
  }

  // check isDone
  if ('isDone' in data) {
    todoDTO.isDone = data.isDone;
  } else { // set false by default
    console.log(`A prop "isDone" for the todo with id: ${todoDTO.id} was set to false as there was not find appropriate key from response`);
    todoDTO.isDone = false;
  }

  return todoDTO
}


const fromDTO = (todoDTO: TodoDTO) => {
  const todo = {} as Todo;
  todo.id = todoDTO.id;
  todo.title = todoDTO.title;

  return todo;
}


const toDTO = (todo: Todo) => {
  const todoDTO = {} as TodoDTO;
  todoDTO.id = todo.id;
  todoDTO.title = todo.title;

  return todoDTO;
}


export {
  parseTodoDTO,
  fromDTO,
  toDTO
}
