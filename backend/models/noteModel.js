const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',  //this is related to the userModel i.e 1:M relationship
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ticket',
        },
        text: {
            type: String,
            required: [true, 'Please add some text'],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,  //this automatically adds timestamps to the model ie. createdAt, updatedAt
    }
)

module.exports = mongoose.model('Note', noteSchema)