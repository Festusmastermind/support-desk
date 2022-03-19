//imports 
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User  = require('../models/userModel')
//@desc registers a new user 
//@route /api/users/
//@access public

const registerUser = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }
    //Find if user already exists 
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })
    if(user){
        //if the user is created, then send the status, id, name, and email back as a response..
        res.status(201).json({
            _id: user._id, 
            name : user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new error('Invalid user data')
    }

})

//@desc login a user 
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const { email, password} = req.body 
    const user = await User.findOne({email})

    //check user and passwords match 
    if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email, 
        token: generateToken(user._id),
    })
    }else{
        res.status(401) //unauthorized access...
        throw new Error('Invalid credentials')
    }
})

//generate token 
const generateToken = (id) => {
    //your JWT_SECRET can be anything ....but generate a random strings to make it stronger..
    //you caj https://jwt.io to decode your generated token and it will reveal information protected by the token ...
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//@desc Get current user 
//@route /api/users/me
//@access Private 

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
    //res.send('me')  this is for testing the response ..when the api is called..
})

//@desc Get all users 
//@route /api/users/all
//@public 


module.exports = {
    registerUser, 
    loginUser,
    getMe,
}





//NB: note that mongoDb save their id in a table using _id 