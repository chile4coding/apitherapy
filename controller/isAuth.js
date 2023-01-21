const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next)=>{
    
    const authHeader = req.get('Authorization')
    if(!authHeader){
        return res.status(400).json({
            message: "Unauthorized User"
        })
    }
    const token = req.get('Authorization').split(' ')[1]
    let decodeToken;
    try {
        decodeToken = jwt.verify(token,"mysecretmysecretchile" )
    } catch (error) {
        return res.status(400).json({
            message: "Unauthorized User"
        })
    }
    if(!decodeToken){
        return res.status(400).json({
            message: "Unauthorized User"
        })
    }

    req.userId = decodeToken.userId
    next() 
}