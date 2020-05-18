import db from  "../models"


const create = async (req,res) =>{
    db.User.create({
        username:req.body.username,
        Fname:req.body.fn,
        Lname:req.body.ln,
        email: req.body.mailid,
        password: req.body.password
      }).then(function() {
        return res.status(200).json({
            message: "Successfully signed up!"
          })
    
      }).catch(function(err) {
       return  res.status(422).json({error:err}); 
        });
}
const read = async (req, res) => {
    const username=req.params.userid
    const user=await db.User.findOne({
        where :{username :username}
    })
    if(user){
      console.log(user);
      return res.status(200).json(user)
    }
    else
    return res.status(404).send(" User not found");
  }
 export default {create,read}