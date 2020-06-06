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
export {userinfo};
   