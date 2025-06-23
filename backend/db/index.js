const mongoose = require('mongoose')
require('dotenv').config()
const dbString = process.env.DB || ""

const connectDB = async () => {
    const connection = mongoose.connect(dbString + '/todos')
    .then((db) => {
        console.log("DB connected", db.connections.name)
    })
    .catch((e) => console.log("Error in mongoDB connetion", e))
}
module.exports = connectDB