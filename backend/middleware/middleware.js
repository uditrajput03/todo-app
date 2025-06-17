const jwt = require('jsonwebtoken')

async function softauthMiddleware(req,res,next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT)
        req.auth = verified
        console.log(verified);
        await next()
    } catch (error) {
        await next()
    }
}
async function strictAuthMiddlewar(req,res,next) {
    if(!req.auth){
        res.status(401).json({msg: "Invalid token"})
    }
    else{
        await next()
    }
    
}
module.exports = { softauthMiddleware, strictAuthMiddlewar }