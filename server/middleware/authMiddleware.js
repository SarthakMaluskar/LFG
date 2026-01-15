const jwt = require('jsonwebtoken')

function requireAuth (req,res,next ){
    const token = req.cookies.token;
    if(!token){
        return res.sendStatus(401); //not logged in
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId;
    next();
    } catch(err){
        return res.sendStatus(401);
    }
    
}

module.exports = requireAuth;