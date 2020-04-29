
var express=require("express");
const { Validator } = require('node-input-validator');
var con = require('./config');
var bcrypt = require('bcrypt');
module.exports.register = async function(req,res){
	const password = req.body.password;
  //const encryptedPassword = await new Promise((resolve, reject) => {
    //bcrypt.hash(password,1, function(err, hash) {
      //if (err) reject(err)
      //resolve(hash)
    //});
  //})
	const v = new Validator(req.body, {
		fn:'required',
    mailid: 'required|email',
    password: 'required|minLength:6'
  });
	v.check().then((matched) => {
	    if (!matched)
			 { console.log(v.errors);
				 if(v.errors.password)
				 {
	     res.render("signup.ejs",{message:v.errors.password.message});
		 }
		 else if(v.errors.mailid)
		 res.render("signup.ejs",{message:v.errors.mailid.message});
		 else if(v.errors.fn)
		 res.render("signup.ejs",{message:v.errors.mailid.message});
			}
			else {
				con.query("Insert into user VALUES ('"+req.body.username+"','"+req.body.fn+"','"+req.body.ln+"','"+password+"','"+req.body.mailid+"')", function (error, results, fields) {
	 	     if (error)
				 {
	 	       console.log(error);
	 	     res.render("signup.ejs",{message:"try another username"});
	 	     }
				  else {
	 	       console.log(results);
	 	       res.send({
	 	         "code":200,
	 	         "success":"user registered sucessfully"
	 	           });
	 	       }
	 	   });
			}

		});

};
