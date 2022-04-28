/**
 * Todo object.
 *
 * @typedef {Object} Todo
 * @property {Number} id
 * @property {String} title
 * @property {String} description
 * @property {status} status
 * @property {priority} priority
 */

const { map } = require('../app');

/**
 * Enum for Todo status values.
 *
 * @readonly
 * @enum {String}
 */
const status = {
	TODO: 'todo',
	DOING: 'doing',
	DONE: 'done',
};

/**
 * Enum for Todo priority values.
 *
 * @readonly
 * @enum {Number}
 */
const priority = {
	LOW: 0,
	MEDIUM: 1,
	HIGH: 2,
};

/**
 * @type {Map<Number, Todo>}
 */
const todos = new Map();
let identifierStatus = 1;

/**
 * Create new Todo
 *
 * @param {Todo} todo
 * @returns {void}
 */
function add(todo) {
	Object.assign(todo, {
		id: identifierStatus++,
		status: 'todo',
	});

	todos.set(todo.id, todo);
}

/**
 * Get all Todos
 *
 * @returns {Array<Todo>}
 */
function getAll() {
	return Array.from(todos.values());
}

/**
 * Get single Todo by its ID
 *
 * @param {Number} id
 * @returns {Todo}
 */
function getById(id) {
	return todos.get(id);
}

/**
 * Update single Todo
 *
 * @param {Todo} todo
 * @returns {void}
 */
function update(todo) {
	if (!todos.has(todo.id)) {
		throw new Error(`Failed to update Todo with ID "${todo.id}"`);
	}

	todos.set(todo.id, todo);
}

/**
 * Remove single Todo
 *
 * @param {Todo} todo
 * @returns {void}
 */
function remove(todo) {
	todos.delete(todo.id);
}

module.exports = {
	todoStatus: status,
	todoPriority: priority,
	add,
	getAll,
	getById,
	update,
	remove,
};
