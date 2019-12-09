const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    fname : String,
    lname : String,
    uname : String,
    password : String,
    confirmPassword : String,
    email : String,
    phone : Number,
    gender : String,
    address : String
});

var Userdata = mongoose.model('user',NewUserSchema);
module.exports = Userdata;