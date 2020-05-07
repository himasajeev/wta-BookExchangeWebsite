const express=require("express");
const bodyParser=require("body-parser");
const session = require("express-session");
const db = require("./models");
const passport = require("./config/passport");
const path = require('path');
const https = require("https");
const ejs = require("ejs");
const flash = require("connect-flash");
//var con = require('./config');
const register=require("./register.js")
//const login =require("./login.js")
const addbook = require("./addbook.js")
const fileUpload = require("express-fileupload");

const app=express();

app.set("view-engine","ejs");
app.use(fileUpload());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(flash());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// app.get("/",function(req,res){
//   res.sendFile(path.join(__dirname + '/main.html'));
// });
//
// app.get("/login",function(req,res){
//   res.render("login.ejs",{message:" "});
// });
//app.post("/login",login.login);



app.post("/addbook",addbook.addbook);
//app.post("/signup",register.register);
  //validate fi
app.get("/addbook/:username",function(req,res)
{let username = req.params.username;
  res.render("addbook.ejs",{message:"",username:username});
})
db.sequelize.sync().then(function() {
app.listen(4000,function(){
	console.log("server started on 4000");
});
});
