import express from "express";
import controller from '../controllers/todos';

const router = express.Router();

router.get('/todos', controller.getAllTodos);
router.get('/todos/:id', controller.getTodo);
router.put('/todos/:id', controller.updateTodo);
router.delete('/todos/:id', controller.deleteTodo);
router.post('/todos/', controller.addTodo);

export = router;