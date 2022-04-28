const { checkSchema } = require('express-validator');

const { todoStatus, todoPriority } = require('../../models/todo.model');
const { length, exists, string, number } = require('../../shared/messages');

/**
 * @type {import('express-validator').ParamSchema}
 */
const titleValidation = {
	in: 'body',
	isString: {
		errorMessage: string('title'),
	},
	exists: {
		errorMessage: exists('title'),
	},
	isLength: {
		errorMessage: length('title', 2, 64),
		options: {
			min: 2,
			max: 64,
		},
	},
};

/**
 * @type {import('express-validator').ParamSchema}
 */
const descriptionValidation = {
	in: 'body',
	isString: {
		errorMessage: string('description'),
	},
	exists: {
		errorMessage: exists('description'),
	},
	isLength: {
		errorMessage: length('description', 2, 1014),
		options: {
			min: 2,
			max: 1024,
		},
	},
};

/**
 * @type {import('express-validator').ParamSchema}
 */
const priorityValidation = {
	in: 'body',
	isNumeric: {
		errorMessage: number('priority'),
	},
	isIn: {
		options: [[todoPriority.LOW, todoPriority.MEDIUM, todoPriority.HIGH]],
	},
};

/**
 * @type {import('express-validator').ParamSchema}
 */
const statusValidation = {
	in: 'body',
	isString: {
		errorMessage: string('status'),
	},
	isIn: {
		options: [[todoStatus.TODO, todoStatus.DOING, todoStatus.DONE]],
	},
};

const addTodoValidations = checkSchema({
	title: titleValidation,
	description: descriptionValidation,
	priority: priorityValidation,
});

const updateTodoValidations = checkSchema({
	title: titleValidation,
	description: descriptionValidation,
	priority: priorityValidation,
	status: statusValidation,
});

module.exports = {
	addTodoValidations,
	updateTodoValidations,
};
