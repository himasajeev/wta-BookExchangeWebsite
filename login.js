var express=require("express");
var con = require('./config');
var bcrypt = require('bcrypt');
module.exports.login = function(req,res){
	var username= req.body.username;
  var password = req.body.password;
  console.log(username,password);
  con.query('SELECT Passwordd FROM user WHERE Username = ?',[username], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        console.log(results)
        var ans=password.localeCompare(results[0].Passwordd)
        //const comparision = await bcrypt.compare(password, results[0].Passwordd)
        if(ans==0){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          console.log(results,password,results[0].Passwordd,ans)
          res.render("login.ejs",{
               message:"username and password does not match"
          });
        }
      }
      else{
				res.render("login.ejs",{
						 message:"username does not exits"
				});

      }
    }
    });
};
