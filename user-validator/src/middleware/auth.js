const jwt = require('jsonwebtoken')
require('../db/db')
const User = require('../models/usermodel')

const auth = async (req,res, next)=>{
    try{
        
        if(req.headers.authorization==null){
        res.status(404).json({ 
            "status":"fail",
            "message":"first login for acees"
        })
    }
    else if(req.headers.authorization.startsWith("Bearer "))
            {
                let token = req.headers.authorization.split(' ')[1]
                
                const decoded  = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findOne({_id : decoded._id})
                if(!user){
                        throw new Error('please login')
                    }
                req.token = token
                req.user = user
                next()
                }
            }catch(err){
                res.send({error : 'please authenticate'})
            }
}



module.exports = auth