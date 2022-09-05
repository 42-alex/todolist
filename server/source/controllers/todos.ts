import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { delay } from '../helpers';
import { mockTodos } from '../mocks/data';
import { Todo } from '../types';


const getAllTodos = async (req: Request, res: Response) => {
  await delay(800);
  let todos: Todo[] = mockTodos;

  return res
    .status(200)
    .json({ message: todos, status: 'OK' })
}


const getTodo = async (req: Request, res: Response) => {
  await delay(800);
  const id: string = req.params.id;
  let requestedTodo: Todo | undefined = mockTodos.find(todo => todo.id === id);

  // if the tоdo was not found
  if (!requestedTodo) {
    const errorMessage: string = `A todo with id '${id}' was not found`

    return res
      .status(404)
      .json({ message: errorMessage, status: 'Error' })
  }

  // if the tоdo was found
  return res
    .status(200)
    .json({ message: requestedTodo, status: 'OK' })
}


const updateTodo = async (req: Request, res: Response) => {
  await delay(800);
  const id: string = req.params.id;
  const newTitle: string = req.body.title ?? null;
  const todoToUpdate: Todo | undefined = mockTodos.find(todo => todo.id === id)

  // if the tоdo was not found
  if (!todoToUpdate) {
    const errorMessage: string = `A todo with id '${id}' was not found`

    return res
      .status(404)
      .json({ message: errorMessage, status: 'Error' })
  }

  // if the tоdo was found
  if (todoToUpdate) {
    todoToUpdate.title = newTitle
  }

  return res
    .status(200)
    .json({ message: todoToUpdate, status: 'OK' })
}


const deleteTodo = async (req: Request, res: Response) => {
  await delay(800);
  const id: string = req.params.id;
  const todoToDelete: Todo | undefined = mockTodos.find(todo => todo.id === id);

  // if the tоdo was not found
  if (!todoToDelete) {
    const errorMessage: string = `A todo with id '${id}' was not found`

    return res
      .status(404)
      .json({ message: errorMessage, status: 'Error' })
  }

  // if the tоdo was found
  const successMessage: string = `A todo with id '${id}' was deleted successfully`

  return res
    .status(200)
    .json({ message: successMessage, status: 'OK' })
}


const addTodo = async (req: Request, res: Response) => {
  const newTodoId: string = uuidv4();
  const newTitle: string = req.body.title;
  const newTodo: Todo = {
    id: newTodoId,
    title: newTitle,
    isDone: false
  }
  mockTodos.push(newTodo)

  return res
    .status(201)
    .json({ message: newTodo, status: 'OK' })
}


export default {
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  addTodo
};
