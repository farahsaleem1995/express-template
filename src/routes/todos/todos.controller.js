const express = require('express');

const todosModel = require('../../models/todo.model');
const { success, error } = require('../../utils/api-response');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function addTodo(req, res) {
	const createModel = req.body;

	todosModel.add(createModel);

	res.status(201).json(success(createModel, 201));
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
function getAllTodos(req, res) {
	const todos = todosModel.getAll();

	res.status(200).json(success(todos, 200));
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
		return res.status(404).json(error(`Todo with ID "${id}" not found.`, 404));
	}

	res.status(200).json(success(todo, 200));
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
		return res.status(404).json(error(`Todo with ID "${id}" not found.`, 404));
	}

	Object.assign(todo, updateModel);
	todosModel.update(todo);

	res.status(200).json(success(todo, 200));
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
		return res.status(404).json(error(`Todo with ID "${id}" not found.`, 404));
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
