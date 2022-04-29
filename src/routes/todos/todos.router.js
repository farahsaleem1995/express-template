const express = require('express');

const { addTodo, getAllTodos, getTodoById, updateTodo, removeTodo } = require('./todos.controller');
const { addTodoSchema, updateTodoSchema } = require('./todos.validator');
const { validate } = require('../../shared/middlewares');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', validate(addTodoSchema), addTodo);
router.get('/:id', getTodoById);
router.put('/:id', validate(updateTodoSchema), updateTodo);
router.delete('/:id', removeTodo);

module.exports = router;
