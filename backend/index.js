const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const { userRoute } = require('./api/user')
const { todoRoute } = require('./api/todo')
const { authMiddleware, softauthMiddleware } = require('./middleware/middleware')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/user', userRoute)
app.use('/api/v1/todo', softauthMiddleware, todoRoute)

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    msg: err.message || "Unknown Error Occurred",
  });
});

async function startServer(){
    await connectDB()
    app.listen(process.env.PORT || 3000 , () => {
        console.log('Server is running')
    })
}
startServer()