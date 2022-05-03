const express = require('express');

const todosModel = require('../../models/todo.model');
const { success, error } = require('../../utils/api-response');

async function addTodo(req, res) {
	const todo = req.body;

	const id = await todosModel.add(todo);

	res.status(201).json(success(id, 201));
}

async function getAllTodos(req, res) {
	const todos = await todosModel.getAll();

	res.status(200).json(success(todos, 200));
}

async function getTodoById(req, res) {
	const id = req.params.id;

	const todo = await todosModel.getById(id);
	if (!todo) {
		return res.status(404).json(error(`Todo with ID "${id}" not found.`, 404));
	}

	res.status(200).json(success(todo, 200));
}

async function updateTodo(req, res) {
	const id = req.params.id;
	const updatedTodo = req.body;

	const todo = await todosModel.getById(id);
	if (!todo) {
		return res.status(404).json(createErrorResponse(`Todo with ID "${id}" not found.`, 404));
	}

	Object.assign(todo, updatedTodo);
	await todosModel.update(todo);

	res.status(200).json(success(todo, 200));
}

async function removeTodo(req, res) {
	const id = req.params.id;

	const todo = await todosModel.getById(id);
	if (!todo) {
		return res.status(404).json(createErrorResponse(`Todo with ID "${id}" not found.`, 404));
	}

	await todosModel.remove(todo);

	res.status(204).json();
}

module.exports = {
	addTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	removeTodo,
};
