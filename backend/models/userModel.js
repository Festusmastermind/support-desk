const mongoose  = require('mongoose') // we need mongoose to create the model schema...

//mongoose create id as _id for each model by default...
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String, 
        required: [true, 'Please add an email'],
    },
    password: {
        type: String, 
        required: [true, 'Please add a password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, 
{
    timestamps: true, 
}
)


module.exports = mongoose.model('User', userSchema)