const express = require('express');

const { addTodo, getAllTodos, getTodoById, updateTodo, removeTodo } = require('./todos.controller');
const { addTodoSchema, updateTodoSchema } = require('./todos.validator');
const { validator } = require('../../middlewares');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', validator(addTodoSchema), addTodo);
router.get('/:id', getTodoById);
router.put('/:id', validator(updateTodoSchema), updateTodo);
router.delete('/:id', removeTodo);

module.exports = router;
