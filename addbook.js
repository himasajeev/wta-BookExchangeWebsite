var express=require("express");
var con = require('./config');
var busboy = require('connect-busboy');
const app = express();
app.use(busboy());
//const multer= require("multer");
var fileUpload = require("express-fileupload")
module.exports.addbook = async function(req,res){
let title = req.body.title;
let author = req.body.author;
let price = req.body.price;
let username=req.body.username;
console.log(username);

if (!req.files)
			return res.status(400).send('No files were uploaded.');
let file = req.files.image;
let imgage_name = username+title+author;
console.log(file.mimetype);
 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
 {file.mv('public/images/uploaded/'+imgage_name, function(err) {
	      if (err) return res.status(500).send(err);
        //add query

      });
			res.send("Book succesfully added!");
  }
  else {
    {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs',{message: message});

    }
  }
};
