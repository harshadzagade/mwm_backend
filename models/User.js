const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: true
    },
    middlename: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    gr_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role', 
        required: true 
    },
    institute: { 
        type:String,
        required: true
    },
    programme: {
        type:String,
        required: true
    },
    sessionExpiry: {
        type:Date,
        required: false
    },
    status: { 
        type: Number, 
        default: 1 
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;