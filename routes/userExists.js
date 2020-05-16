var express=require("express")
const db = require("../models");

async function userExists(username,email){
    const user1=db.User.findOne({
        where :{username}
    })
    if (user1) return 1
    const user2=db.User.findOne({
        where :{email}
    })
     if (user2) return 2

    return false

}
module.exports=userExists