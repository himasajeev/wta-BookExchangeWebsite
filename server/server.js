const express=require("express");
const bodyParser=require("body-parser");
const session = require("express-session");
const db = require("./models");
const passport = require("../config/passport");
const path = require('path');
const https = require("https");
const ejs = require("ejs");
const flash = require("connect-flash");

const app=express();

app.set("view-engine","ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(flash());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
app.listen(4000,function(){
	console.log("server started on 4000");
});
});
