//all imports is via require...
//NB: all Private request demands that JWT is sent with the request.. 
const asyncHandler = require('express-async-handler')  //to handle async request...

//import the User and Ticket Model 
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desc Get user tickets 
//@route Get /api/tickets 
//@access Private ...
const getTickets  = asyncHandler(async (req, res)=>{
    //Get user using the id in the JWT 
    //console.log(req)
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not Found!!')
    }

    const tickets  = await Ticket.find({user:req.user.id})
    res.status(200).json(tickets) //return all the tickets created by a specific user...
})


//@desc Get user ticket 
//@route Get /api/ticket/:id
//@access Private 
const getTicket = asyncHandler(async (req, res) => {
    //Get user using the id JWT 
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401) //unauthorized access i.e. access denied
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404) //page not found ...i.e. request can't be matched 
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401) //access denied 
        throw new Error('Not Authorized, Access Denied')
    }
    res.status(200).json(ticket)
})

//@desc Create new ticket 
//@route POST /api/tickets
//@access Private 

const createTicket = asyncHandler(async (req, res)=>{
    const { product, description} = req.body
    if(!product || !description){
        res.status(400) //bad credentials 
        throw new Error('Please add a product and description')
    }
    //Get user using the id in the JWT 
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.create({
        product, 
        description, 
        user: req.user.id, 
        status: 'new',
    })
    res.status(201).json(ticket)
})


//@desc Delete Ticket 
//@route /api/tickets/:id 
//@access Private 
const deleteTicket = asyncHandler(async(req, res)=>{
    //Get user using the id in the JWT 
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401) //access denied 
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401) //access denied 
        throw new Error('Not Authorized')
    }
    
    //else 
    await ticket.remove()
    res.status(200).json({success: true})

})
//@desc Update ticket 
//@route PUT /api/tickets/:id
//@access Private 

const updateTicket = asyncHandler(async (req, res)=> {
    //Get user using the id in the JWT 
    //console.log(req)
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401) //access denied 
        throw new Error('You are not authorized to update this ticket ')
    }

    const ticket = await Ticket.findById(req.params.id) //get the specific tikcet
    if(!ticket){
        res.status(404) //request not found 
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
         res.status(401) // access denied 
         throw new Error('You are not authorized to edit this ticket')
    }

    //else 
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new : true}
    )
    //the object {new: true } means that if the status new is not there already then create it ....as default ..
    res.status(200).json(updatedTicket) // return the updated ticket
})


module.exports = {
    getTickets, 
    getTicket, 
    createTicket, 
    deleteTicket, 
    updateTicket,
}

