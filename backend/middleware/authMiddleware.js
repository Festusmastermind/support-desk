const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler') //this handle the asynchronous requests....
const User = require('../models/userModel')  //this is more like the user table at the moment...


const protect = asyncHandler(async (req, res, next)=>{
    let token  //declare a variable token ...
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            /*Get token from header NB: split turns a string into an array ....then you can seperate it with 
            whatever you want and access any particular string you want precisely....*/
            token = req.headers.authorization.split(' ')[1]
           // console.log(token)
            //verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded)
            //Get user info by using the id from token 
            req.user = await User.findById(decoded.id).select('-password') //exclude the password from the user table ...
            //console.log(req.user)
            next() //then run the url function 
        }catch(error){
           // console.log(error)
            res.status(401) //unathorized access...
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect } 