const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})

module.exports = mongoose.model("User", UserSchema);