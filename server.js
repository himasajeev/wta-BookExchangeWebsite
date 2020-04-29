const express=require("express");
const bodyParser=require("body-parser");
const path = require('path');
const https = require("https");
const ejs = require("ejs");
var con = require('./config');
const register=require("./register.js")
const login =require("./login.js")
const app=express();

app.set("view-engine","ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + '/main.html'));
});

app.get("/login",function(req,res){
  res.render("login.ejs",{message:" "});
});
app.post("/login",login.login);
app.get("/signup",function(req,res){
  res.render("signup.ejs",{message:" "});
});
app.post("/signup",register.register);
  //validate fi

var server=app.listen(4000,function(){
	console.log("server started on 4000");
});
