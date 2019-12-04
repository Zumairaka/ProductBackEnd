const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDB');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : String,
    password : String,
    confirmPassword : String,
    email : String,
    phoneNumber : Number,
    gender : String,
    address : String
});

var Userdata = mongoose.model('user',NewUserSchema);
module.exports = Userdata;