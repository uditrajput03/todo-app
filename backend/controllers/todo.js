const { default: mongoose, mongo } = require("mongoose");
const { User, Todo } = require("../db/schema");

async function createTodo(req,res) {
    let email = req?.auth?.email
    if(!email) email = "public"
    data = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const todo = new Todo({title: data.title, description: data.description})
        await todo.save()
        const user = await User.findOneAndUpdate({email}, {
            '$push': {todos: todo._id}
        })
        await session.commitTransaction()
        res.json({todo})
    } catch (error) {
        await session.abortTransaction()
        res.status(400).json({msg: "Unauthorized"})
    }
}

async function getTodo(req, res) {
    let email = req?.auth?.email
    if(!email) email = "public"
    try {
        const user = await User.findOne({email}).populate('todos')
        console.log(user);
        
        res.json({todos: user.todos})
    } catch (error) {
        res.status(400).json({msg: "Unauthorized"})
    }
}

async function updateTodo(req, res) {
    const id = req.params.id
    let email = req?.auth?.email
    if(!email) email = "public"

    try {
        const user = await User.findOne({email})
        console.log(user);
        
        let owner = user.todos.some(todo => todo.toString() === id)
        if (!owner) {
            return res.status(401).json({msg: "Unauthorized"})
        }
        const todo = await Todo.findOneAndUpdate({_id: id} , {completed: true}, {new: true})
        console.log(todo);
        
        res.json({msg:"Success", todo})

    } catch (error) {
        res.status(400).json({msg: "Unauthorized"})
    }
}

async function removeTodo(req, res) {
    const id = req.params.id
    let email = req?.auth?.email
    if (!email) {
        email = "public"
        // res.status(400).json({msg: "Unauthorized"})
    }
    try {
        const user = await User.findOne({email})

        const todo = await Todo.findOneAndDelete({_id: id, _id: {'$in': user.todos}})
        if (todo) {
            res.json({msg:"Success"})
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        res.status(400).json({msg: "Unauthorized"})
    }
}

module.exports = { createTodo, getTodo, updateTodo, removeTodo}