
import passport from "../../config/passport"

 
const signin = async (req,res) =>{
  console.log("inside signin")
  console.log(req.user)
    passport.authenticate('local', function(err, user, info) {
        if (err) 
        {  console.log("chpt 1")
          return res.status('401').json({
            error: "Could not sign in"
          })
         }
        if (!user) 
        { console.log("chpt 2")
          return res.status('200').json({
            error: "User not found"
          }) 
        }
        req.logIn(user, function(err) 
        {
          if (err)
           { console.log("chpt 3")
             return res.status('200').send({
            error: "Email and password don't match."
          })
        }console.log("chpt 4")
          return res.status('200').send("Successful");
        });
    })(req, res);
    

}

const hasAuthorization = (req, res, next) => { //middleware for authorization

    const authorized = req.user.username == req.params.userid ;
    console.log(req.user.username,req.params.userid);
    
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    console.log("patch it up!!!");
    
    next()
  }
const signout = async(req,res) =>{
    req.logout();
    res.status('200').send("logged out");
}



export default {signin,signout,hasAuthorization}