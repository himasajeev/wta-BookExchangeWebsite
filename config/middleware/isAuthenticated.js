module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  console.log(req);
  
  if (req.user) {

    return next();
  }

  // If the user isn't' logged in, redirect them to the login page
else
  return res.status(401).json({error:"You are not authorized"});

};
