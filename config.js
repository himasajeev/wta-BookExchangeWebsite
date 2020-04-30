const mysql=require('mysql');
var express=require("express");
const con=mysql.createConnection({
	host: "localhost",
	user: "root",
	password:"0903siddharth1210",
	database:"mydb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports=con;
