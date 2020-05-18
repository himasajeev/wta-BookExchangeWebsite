var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


import db from "../server/models"
passport.use(new LocalStrategy(

  {passReqToCallback : false,
    usernameField: "username"
    //passwordField : 'password'
  },
  function(username, password, done) {
//console.log(username+password);
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {

      if (!dbUser) {

        return done(null, false, {
          message: "Incorrect Username"
        });
      }

      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }

      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;
