const mongoose = require('mongoose')
const { User } = require('./schema')
require('dotenv').config()
const dbString = process.env.DB || ""

const connectDB = async () => {
    const connection = mongoose.connect(dbString + '/todos')
    .then((db) => {
        console.log("DB connected", db.connections.name)
    })
    .catch(() => console.log("Error in mongoDB connetion"))
}
module.exports = connectDB