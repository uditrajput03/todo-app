const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../db/schema')
const saltround = 10

async function createUser(req, res){
    const data = req.body
    const hashedPass = await bcrypt.hash(data.password, saltround)
    console.log("Hashed pass", hashedPass);
    try {
        const user = new User({email: data.email, password: hashedPass})
        await user.save()
        const token = jwt.sign({email: user.email} , process.env.JWT)
        res.json({token})
    } catch (error) {
        res.status(404).json({"msg": "Error in creating user"})
    }
}
async function loginUser(req,res) {
    const data = req.body
    try {
        const user = await User.findOne({email: data.email})
        console.log("Hashed pass", user);
        const result = await bcrypt.compare(data.password, user.password)
        console.log("Hashed pass", result);
        if(result == true){
            const token = jwt.sign({email: user.email} , process.env.JWT)
            res.json({token})
        }
        else{
            res.status(401).json({msg:"Incorrect password"})
        }
    } catch (error) {
        res.status(404).json({"msg": "Error in creating user"})
    }
}

function checkAuth(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT)
        res.json({verified})
    } catch (error) {
        res.status(404).json({"msg": "Bad Token"})
    }
}
module.exports = {createUser , loginUser, checkAuth}