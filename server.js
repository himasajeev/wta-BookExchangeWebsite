const express=require("express");
const bodyParser=require("body-parser");
const path = require('path');
const https = require("https");
const mysql=require('mysql');
const ejs = require("ejs");

const app=express();
app.set("view-engine","ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended:true}));

let users =[];




app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + '/main.html'));
});

app.get("/login",function(req,res){
  res.render("login.ejs",{message:" "});
});
app.post("/login",function(req,res){
  const givenUsername = req.body.username;
  const givenPassword = req.body.password;
  let  flag =-1;
  console.log(givenUsername);
  console.log(givenPassword);
  console.log(users);
users.forEach(function(user){
  console.log(user);
  if(user.username === givenUsername && user.password === givenPassword)
     {
       res.send("Success");
     flag =0;}
});
if(flag ==-1)
res.render("login.ejs",{message:"Incorrect Username/Password "});
});
app.get("/signup",function(req,res){
  res.render("signup.ejs");
});
app.post("/signup",function(req,res){
  //validate first
   users.push(req.body);
   res.redirect("/login");
});

var server=app.listen(4000,function(){
	console.log("server started on 4000");
});
