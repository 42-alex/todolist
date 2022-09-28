import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { delay } from '../helpers';
import { mockTodos } from '../mocks/data';
import { Todo, TodoImportance } from '../types';


const getAllTodos = async (req: Request, res: Response) => {
  await delay(800);

  return res
    .status(200)
    .json({ data: mockTodos, meta: null })
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
      .json({ error: { message: errorMessage }})
  }

  // if the tоdo was found
  return res
    .status(200)
    .json({ data: requestedTodo, meta: null })
}


const updateTodo = async (req: Request, res: Response) => {
  await delay(800);
  const id: string = req.params.id;
  const todoToUpdate = mockTodos.find(todo => todo.id === id);

  // if the tоdo was not found
  if (!todoToUpdate) {
    const errorMessage: string = `Bad request. Make sure you provided the correct id`

    return res
      .status(400)
      .json({ error: { message: errorMessage }})
  }

  // update only props with new data
  if (req.body.title) {
    todoToUpdate.title = req.body.title;
  }
  if (req.body.importance) {
    todoToUpdate.importance = req.body.importance;
  }
  if (req.body.isDone != null) {
    todoToUpdate.isDone = req.body.isDone;
  }

  return res
    .status(200)
    .json({ data: todoToUpdate, meta: null })
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
      .json({ error: { message: errorMessage }})
  }

  // if the tоdo was found
  const todoToDeleteIndex = mockTodos.findIndex(todo => todo.id === todoToDelete.id )
  // @ts-ignore
  globalThis.mockTodos = mockTodos;
  mockTodos.splice(todoToDeleteIndex, 1);

  return res
    .status(200)
    .json({ data: todoToDelete, meta: null })
}


const addTodo = async (req: Request, res: Response) => {
  await delay(800);
  const newTodoId: string = uuidv4();
  const newTodoTitle: string = req.body.title;
  const newTodoImportance: TodoImportance = req.body.importance || 'ordinary';

  if (!newTodoTitle) {
    const errorMessage = 'It seems the title you provided is not correct';

    return res
      .status(400)
      .json({ error: { message: errorMessage } })
  }


  const newTodo: Todo = {
    id: newTodoId,
    title: newTodoTitle,
    importance: newTodoImportance ,
    isDone: false
  }
  mockTodos.push(newTodo)

  return res
    .status(201)
    .json({ data: newTodo })
}


export default {
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  addTodo
};
