const express = require('express');

const todosModel = require('../../models/todo.model');
const { notFound } = require('../../shared/messages');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function addTodo(req, res) {
	const createModel = req.body;

	todosModel.add(createModel);

	res.status(201).json(createModel);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function getAllTodos(req, res) {
	const todos = todosModel.getAll();

	res.status(200).json(todos);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function getTodoById(req, res) {
	const id = Number(req.params.id);

	const todo = todosModel.getById(id);
	if (!todo) {
		return res.status(404).json({
			error: notFound('Todo', id),
		});
	}

	res.status(200).json(todo);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function updateTodo(req, res) {
	const id = Number(req.params.id);
	const updateModel = req.body;

	const todo = todosModel.getById(id);
	if (!todo) {
		return res.status(404).json({
			error: notFound('Todo', id),
		});
	}

	Object.assign(todo, updateModel);
	todosModel.update(todo);

	res.status(200).json(todo);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function removeTodo(req, res) {
	const id = Number(req.params.id);

	const todo = todosModel.getById(id);
	if (!todo) {
		return res.status(404).json({
			error: notFound('Todo', id),
		});
	}

	todosModel.remove(todo);

	res.status(204).json();
}

module.exports = {
	addTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	removeTodo,
};
