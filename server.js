var express=require("express");
var http=require("http");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var path = require('path');
var mysql=require('mysql');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));

const con=mysql.createConnection({
	host: "localhost",
	user: "root",
	password:"hartsharts",
	database:"mydb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// viewed at http://localhost:8080
app.get('/', function(req, res) {
	con.query("select * from book",function(err,result){
       console.log(result);
       console.log(err);
	});
    res.sendFile(path.join(__dirname + '/client/home.html'));
});


var server=app.listen(4000,function(){
	console.log("server started on 4000");
});