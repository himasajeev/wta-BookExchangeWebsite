var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
var ejs = require("ejs");
var bodyParser = require("body-parser");

module.exports = function(app) {
  app.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/',failureFlash:true })(req, res));

  app.post("/signup", function(req, res) {
      console.log(req.body);
      db.User.create({
        username:req.body.username,
        Fname:req.body.fn,
        Lname:req.body.ln,
        email: req.body.mailid,
        password: req.body.password
      }).then(function() {
        console.log("created");
      //  res.send("created");
      passport.authenticate("local")(req,res,function(){
     console.log("k?");
     res.redirect("/profile");
   });
      //res.redirect(307,"/login");
      }).catch(function(err) {
        console.log(err.errors);

          res.render("signup.ejs",{message:err.errors[0].message})
        });
      //  res.json(err);
        // res.status(422).json(err.errors[0].message);

    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });


  };
