import axios from '../axiosConfig'
const userinfo =async (username)=>{
    try{
        const res = await axios.get('/users/'+username);
        console.log(res);
        return res;

    }
    catch(err){
        console.log(err.res);}
}  
const signup =  async (user)=>{
    //console.log("inside login");
    
    try{
        const res = await axios.post('/users',
        {username:user.username,password:user.password,fn:user.fn,ln:user.ln,mailid:user.mailid});
        console.log(res);
        return res;

    }
    catch(err){
        
        console.log(err.res);}
    }
export {userinfo,signup};
   