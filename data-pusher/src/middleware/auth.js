const jwt = require('jsonwebtoken')
require('../db/db')
const User = require('../models/usermodel')

const auth = async (req,res, next)=>{
    console.log('1');
    try{
        
        if(req.headers.authorization==null){
            console.log('1');
        res.status(404).json({ 
            "status":"fail",
            "message":"first login for acees"
        })
    }
    else if(req.headers.authorization.startsWith("Bearer "))
            {
                let token = req.headers.authorization.split(' ')[1]
                
                const decoded  = jwt.verify(token, 'assignment3')
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