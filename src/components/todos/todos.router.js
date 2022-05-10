const { addTodoSchema, updateTodoSchema } = require('./todos.validator');

/**
 *
 * @param {{express: import('express')}}
 */
function todosRouter({ express, todosController: controller, validationMiddleware: validator }) {
	const router = express.Router();

	router.get('/', controller.getAllTodos);
	router.post('/', validator('body', addTodoSchema), controller.addTodo);
	router.get('/:id', controller.getTodoById);
	router.put('/:id', validator('body', updateTodoSchema), controller.updateTodo);
	router.delete('/:id', controller.removeTodo);

	return router;
}

module.exports = todosRouter;
