const express = require('express');

const { addTodo, getAllTodos, getTodoById, updateTodo, removeTodo } = require('./todos.controller');
const { addTodoValidator, updateTodoValidator } = require('./todos.validator');
const useValidator = require('../../middlewares/validation.middleware');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', useValidator('body', addTodoValidator), addTodo);
router.get('/:id', getTodoById);
router.put('/:id', useValidator('body', updateTodoValidator), updateTodo);
router.delete('/:id', removeTodo);

module.exports = router;
