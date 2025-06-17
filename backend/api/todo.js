const express = require('express')
const { createTodo, getTodo, removeTodo, updateTodo } = require('../controllers/todo')
const { strictAuthMiddlewar } = require('../middleware/middleware')

const todoRoute = express.Router()

todoRoute.post('/', createTodo )
todoRoute.get('/', getTodo)
// todoRoute.delete('/:id',strictAuthMiddlewar, removeTodo)
todoRoute.delete('/:id', removeTodo)
todoRoute.put('/:id', updateTodo)

module.exports = { todoRoute }