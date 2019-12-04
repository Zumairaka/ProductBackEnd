const express = require('express');
const ProductData = require('./src/model/Productdata');
const UserData = require('./src/model/Userdata');
const cors = require('cors');
var bodyparser=require('body-parser');
var app = new express();
app.use(cors());
app.use(bodyparser.json())

app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //console.log(req.body);
    var product = {       
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl,
   }       
   var product = new ProductData(product);
   console.log(product);
   product.save();
});

app.post('/signup',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var user = {
        firstName : req.body.user.firstName,
        lastName : req.body.user.lastName,
        userName : req.body.user.userName,
        password : req.body.user.password,
        confirmPassword : req.body.user.confirmPassword,
        email : req.body.user.email,
        phoneNumber :req.body.user.phoneNumber,
        gender : req.body.user.gender,
        address : req.body.user.address
    }
    var user = new UserData(user);
    console.log(user);
    user.save();
});

app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    ProductData.find()
                .then(function(products){
                    res.send(products);
                });
});

app.post('/delete',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST,PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body.id);
    var id = {
        _id : req.body.id
    }
    ProductData.findByIdAndDelete(id,(error,data)=>{
        if(error)
        {
            throw error;
        }
        else
        {
            console.log("Deleted");
        }
    });
})

app.listen(3000, function(){
    console.log('listening to port 3000');
});

