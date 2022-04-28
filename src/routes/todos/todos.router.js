const express = require('express');

const { addTodo, getAllTodos, getTodoById, updateTodo, removeTodo } = require('./todos.controller');
const { addTodoValidations, updateTodoValidations } = require('./todos.validator');
const { validate } = require('../../shared/middlewares');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', validate(addTodoValidations), addTodo);
router.get('/:id', getTodoById);
router.put('/:id', validate(updateTodoValidations), updateTodo);
router.delete('/:id', removeTodo);

module.exports = router;
