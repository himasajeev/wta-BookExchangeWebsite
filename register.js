
var express=require("express");
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

  con.query("Insert into user VALUES ('"+req.body.username+"','"+req.body.fn+"','"+req.body.ln+"','"+password+"','"+req.body.mailid+"')", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({
        "code":400,
        "failed":"error ocurred",
        "try":"try another username"

      })
    } else {
      console.log(results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
};

