var path = require("path");
var ejs = require("ejs");
var isAuthenticated = require("../config/middleware/isAuthenticated.js");
module.exports = function(app)
{

  app.get("/",function(req,res){

    res.sendFile(path.join(__dirname,'../public/htmlfiles/main.html'));
  });
  app.get("/login",function(req,res){
    if(req.user)
    res.redirect("/profile");
    //console.log(req.flash("error"));
    res.render("login.ejs",{message:req.flash("error")});
  });
  app.get("/signup",function(req,res){
    if(req.user)
    res.redirect("/profile");
    res.render("signup.ejs",{message:" "});
  });
  app.get("/profile",isAuthenticated,function(req,res){
    //get username here as cookie?
    console.log(req.user.username);
    const username = req.user.username;
    res.render("profile.ejs",{username:username});
  });
  app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");

});

};
