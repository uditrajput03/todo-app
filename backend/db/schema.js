const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Todo'
    }]
}, { timestamps: true })

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    completed: {type: Boolean, default: false}
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
const Todo = mongoose.model('Todo', todoSchema)
// const test = new User({email:"test2", password:"te2st"})
// test.save()
module.exports = {User, Todo}
// User.create({email:"test", password:"test"})
