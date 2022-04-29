const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');

const errorHandler = require('./shared/error-handler');
const { createLogger } = require('./shared/logger');
const todosRouter = require('./routes/todos/todos.router');

const app = express();

const logger = createLogger({
	level: 'http',
	maxFiles: 5,
	name: 'requests',
	datePattern: 'YYYYMMDDHH',
	format: winston.format.printf(({ message }) => message.substring(0, message.lastIndexOf('\n'))),
});

app.use(cors());
app.use(express.json());
app.use(
	morgan('combined', {
		stream: {
			write: (message) => logger.http(message),
		},
	})
);

app.use('/todos', todosRouter);

app.use(errorHandler);

module.exports = app;
