const express = require('express');
const cors = require('cors');

const logger = require('./logger');
const todosRouter = require('./routes/todos/todos.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger());

app.use('/todos', todosRouter);

module.exports = app;
