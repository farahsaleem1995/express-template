const todosModel = require('../../models/todo.model');
const { success, error } = require('../../utils/api-response');

async function addTodo(req, res, next) {
	try {
		const todo = req.body;
		const id = await todosModel.add(todo);
		return res.status(201).json(success(id, 201));
	} catch (err) {
		return next(err);
	}
}

async function getAllTodos(req, res, next) {
	try {
		const todos = await todosModel.getAll();
		return res.status(200).json(success(todos, 200));
	} catch (err) {
		return next(err);
	}
}

async function getTodoById(req, res, next) {
	try {
		const id = req.params.id;
		const todo = await todosModel.getById(id);
		if (!todo) {
			return res.status(404).json(error(`Todo with ID "${id}" not found.`, 404));
		}
		return res.status(200).json(success(todo, 200));
	} catch (err) {
		return next(err);
	}
}

async function updateTodo(req, res, next) {
	try {
		const id = req.params.id;
		const updatedTodo = req.body;
		const todo = await todosModel.getById(id);
		if (!todo) {
			return res.status(404).json(createErrorResponse(`Todo with ID "${id}" not found.`, 404));
		}
		Object.assign(todo, updatedTodo);
		await todosModel.update(todo);
		return res.status(200).json(success(todo, 200));
	} catch (err) {
		return next(err);
	}
}

async function removeTodo(req, res, next) {
	try {
		const id = req.params.id;
		const todo = await todosModel.getById(id);
		if (!todo) {
			return res.status(404).json(createErrorResponse(`Todo with ID "${id}" not found.`, 404));
		}
		await todosModel.remove(todo);
		return res.status(204).json();
	} catch (err) {
		return next(err);
	}
}

module.exports = {
	addTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	removeTodo,
};
