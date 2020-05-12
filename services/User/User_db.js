const db=require('../../models');
const op=db.Sequelize.Op
async function UsernameExists(username){
    if(username===null||username===undefined) throw new Error('No username was passed as an argumenrt')
    const user=await db.user.findOne({
        where:{username}
    })
    if(user) return user;
    return null;

}
async function FindUser(credential){
    if(!credential) throw new Error('invalid argument:user id')
    const user=await db.user.findOne({
        where:{[op.or]:[
                {username:credential},
                {id:credential}
            ]}
    })
    if(user) return user;
    return null;
}
async function EmailExists(email){
    if(email===null||email===undefined) throw new Error('No email was passed as an argumenrt')
    const user=await db.user.findOne({
        where:{email}
    })
    if(user) return user;
    return null;
}
async function CreateUser(args){
    if(!args.username) throw new Error('invalid arg:username');
    if(!args.first_name) throw new Error('invalid arg:first_name');
    if(!args.last_name) throw new Error('invalid arg:last_name')
    if(!args.email) throw new Error('invalid arg:email')
    if(!args.password) throw new Error('invalid arg:password')
    const user=await db.user.create({
        first_name:args.first_name,
        last_name:args.last_name,
        username:args.username,
        password:args.password,
        email:args.email,
    })
    return user;
}


module.exports={UsernameExists,
    EmailExists,
    CreateUser,
    FindUser }