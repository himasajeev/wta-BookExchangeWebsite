var express=require("express")
const db = require("../models");

async function usernameExists(args){
	const username=args.username
    const user=db.User.findOne({
        where :{username}
    })
    if (user) return true

    return false

}
async function emailExists(args){
	const email=args.email
    const user=db.User.findOne({
        where :{email}
    })
     if (user) return true

    return false

}

module.exports={usernameExists,emailExists}