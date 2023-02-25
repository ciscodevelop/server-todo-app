import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
 
        
        const token = req.headers?.authorization?.split(" ")[1];
        console.log(token);
        if (!token) return res.status(401).json('Not  authorized need a Token')
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error,payload) => {
            
            if (error) return res.status(403).json(error)
            
            req.user = payload
            next()
        })
        
        
 
}
export default verifyToken;