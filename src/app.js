/**
 *
 * @param {import("awilix").AwilixContainer} container
 */
async function create(container) {
	const express = container.resolve('express');
	const app = express();
	const db = container.resolve('db');
	const cors = container.resolve('cors');
	const { DB_URL } = container.resolve('config');
	const logger = container.resolve('loggingMiddleware');
	const errorHandler = container.resolve('errorHandlingMiddleware');
	const todosRouter = container.resolve('todosRouter');

	await db.connect(DB_URL);

	app.use(cors());
	app.use(express.json());
	app.use(logger);

	app.use('/todos', todosRouter);

	app.use(errorHandler);

	return app;
}

module.exports = { create };
