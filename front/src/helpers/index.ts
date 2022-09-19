import { Todo, TodoDTO } from '../types'

const parseTodoDTO = (data: {[propName: string]: any}) => {
  // todo: add zod validation - https://github.com/42-alex/todolist/pull/10#discussion_r973626769
  const todoDTO = {} as TodoDTO;

  // check id
  if(('id' in data) && (typeof data.id === 'string')) {
    todoDTO.id = data.id;
  } else {
    throw new Error('There is no "id" key in data source or its type is not a "string"')
  }

  // check title
  if (('title' in data) && (typeof data.title === 'string')) {
    todoDTO.title = data.title;
  } else {
    throw new Error(`There is no "title" key in data source or its type is not a "string"`)
  }

  // check isDone
  if (('isDone' in data) && (typeof data.isDone === 'boolean')) {
    todoDTO.isDone = data.isDone;
  } else { // set false by default
    console.log(`There is no "isDone" key in data source or its type is not a "boolean". The default value has been set to: false`);
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
