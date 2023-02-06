const jwt = require("jsonwebtoken")
const SECRET_KEY = "HMENUAPI"
const auth = (req, resp, next)=>{
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            const user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id
        }
        else{
           return resp.status(401).json({message:"Unauthorized User"})
        }
        next();
    } catch (error) {
        console.log(error)
        resp.status(401).json({message:"Unauthorized User"})

    }
};
module.exports = auth;