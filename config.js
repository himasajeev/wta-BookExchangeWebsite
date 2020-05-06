const mysql=require('mysql');
var express=require("express");
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
module.exports=con;
