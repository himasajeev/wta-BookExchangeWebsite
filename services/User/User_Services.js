const{UsernameExists,
    EmailExists,
    CreateUser,
    FindUser}=require('./User_db');
const bcrypt=require("bcrypt");
const saltRounds=10;
async function ValidateUserExists(username,email){
    if(!username || !email) throw new Error('invalid no of arguments')
    let taken_username=null;
    let taken_email=null;
    if(username){
        taken_username=await UsernameExists(username);
    }
    if(email){
        taken_email=await EmailExists(email);
    }
    if(taken_username) return taken_username;
    if(taken_email) return taken_email;
    return null;
}
async function CreateNewUser(args){
    if(args.password) {
        args.password= await _Encrypt(args.password)
    }
    return await CreateUser(args)
}
async function UserSearch(credential){
    return await FindUser(credential);
}

module.exports={
    ValidateUserExists,
    CreateNewUser,
    UserSearch
}

async function _Encrypt(text){
    return await bcrypt.hash(text,saltRounds);
}