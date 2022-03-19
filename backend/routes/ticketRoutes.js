//import express 
const express = require('express')
const router = express.Router()

const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')


//Re-route into note router i.e to get the urls like api/tickets/:ticketId/notes...we have to re-write the url this way..
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

//router.get('/', protect, getTickets)
//router.get('/', protect, createTicket)
//Another way of writing the routes buy chaining them 
router.route('/').get(protect, getTickets).post(protect, createTicket)

//route chaining...instead of specifying the routes individually ..
router
    .route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)



module.exports = router