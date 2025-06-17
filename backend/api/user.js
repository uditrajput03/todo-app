const express = require('express')
const { createUser, loginUser, checkAuth } = require('../controllers/user')

const userRoute = express.Router()

userRoute.post('/signup' , createUser)
userRoute.post('/login', loginUser)
userRoute.get('/auth', checkAuth)

module.exports = { userRoute }