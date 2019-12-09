const express = require('express');
const ProductData = require('./src/model/Productdata');
const UserData = require('./src/model/Userdata');
const cors = require('cors');
const mongoose=require('mongoose');
var bodyparser=require('body-parser');
var app = new express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/Products");
mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Success");
})

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
   //console.log(product);
   product.save((err,data) => {
       if (err) {
           res.json({Status: 'Error'});
       } else {
           res.json({Status: 'Success'});
       }
   });
});

app.post('/update',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // console.log(req.body.product);
    
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
    // console.log(product._id);
    var id = {
        _id: product._id
    }
    console.log(id);
    ProductData.findByIdAndUpdate(id, {$set:product}, (error,data) => {
    if (error) {
        res.json({Status: 'Error'});
        throw error;
    } else {
        console.log(data);
        res.json({Status: 'Success'});
    }
   })
});

app.post('/signup',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var user = {
        fname : req.body.user.fname,
        lname : req.body.user.lname,
        uname : req.body.user.uname,
        password : req.body.user.password,
        confirmPassword : req.body.user.confirmPassword,
        email : req.body.user.email,
        phone :req.body.user.phone,
        gender : req.body.user.gender,
        address : req.body.user.address
    }
    var user = new UserData(user);
    console.log(user);
    user.save((err,data) => {
        if (err) {
            res.json({Status: 'Error'});
        } else {
            res.json({Status: 'Success'});
        }
    });
});

app.post('/login',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    
    UserData.findOne({uname:req.body.uname, password:req.body.password})
        .then(function(error,data){
            if (error) {
                res.json({Status: 'User Does Not Exist. Please SignUp'});
            } else {
            console.log(data);
            res.send({Status: 'Success'});
            }
        });
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
            res.json({Status:'Error'});
            throw error;
        }
        else
        {
            console.log(data);
            res.json({Status:'Deleted'});
        }
    });
})

app.listen(3000, function(){
    console.log('listening to port 3000');
});

