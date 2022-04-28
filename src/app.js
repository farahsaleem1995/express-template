const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const errorHandler = require('./shared/error-handler');
const todosRouter = require('./routes/todos/todos.router');

const app = express();

function pad(num) {
	return (num > 9 ? '' : '0') + num;
}

function generator(time, index) {
	if (!time) return 'file.log';

	var month = time.getFullYear() + '' + pad(time.getMonth() + 1);
	var day = pad(time.getDate());

	return `requests-${month}${day}-${index}-morgan.log`;
}

const stream = rfs.createStream(generator, {
	size: '100M',
	interval: '1d',
	maxFiles: 5,
	encoding: 'utf-8',
	path: 'logs/requests',
	immutable: true,
});

app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream }));

app.use('/todos', todosRouter);
app.use(errorHandler);

module.exports = app;
