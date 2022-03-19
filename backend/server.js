const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } =  require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000


//connect to database
connectDB()

const app = express() 

app.use(express.json()) //this enable us to retrieve the sent data from the client..
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    //res.send('Hello')
    res.status(200).json({message: 'Welcome to Mastermind Ticket Support System'})
})

//Routes...
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Adding ErrorHandler Middleware...
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))