const express = require("express");
const { createTodo, updateTodo ,activeTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        active: true,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({active: true});
    res.json({
        todo:todos
    })

})

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    await todo.findOneAndUpdate({
        _id: req.body.id
    }, {
      completed: true  
    })

    res.json({
        msg: "Todo marked as completed"
    })
})
app.put("/remove", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = activeTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    await todo.findOneAndUpdate({
        _id: req.body.id
    }, {
      active: false  
    })

    res.json({
        msg: "Todo removed"
    })
})

app.listen(3000);