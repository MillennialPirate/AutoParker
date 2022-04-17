const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
    email : {
        type : String, 
        required: true
    }, 
    password : {
        type : String, 
        required: true
    }, 
    role : {
        type : String, 
        required : true
    },
    token : {
        type : String
    }
};
module.exports = mongoose.model("User", userSchema);