const jwt = require("jsonwebtoken")

const auth = async (req,res,next) =>{
    var token = req.headers.authorization
    if(token){
        try{
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
            req.user = verifiedUser
            next()
        }   
        catch(error){
            res.status(401).json({"message":"Unauthorized"})
        }
    }
    else{
        res.status(400).json({"message":"Bad request. No token"})
    }
}
module.exports = auth