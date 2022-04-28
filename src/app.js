const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const todosRouter = require('./routes/todos/todos.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/todos', todosRouter);

module.exports = app;
