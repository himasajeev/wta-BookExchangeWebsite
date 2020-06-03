import axios from '../axiosConfig'


const login =  async (user)=>{
    //console.log("inside login");
    
    try{
        const res = await axios.post('/auth/login',{username:user.username,password:user.password});
        console.log(res);
        return res;

    }
    catch(err){
        
        console.log(err.res);}
    }

const logout =  async (user)=>{
    try{
        const res = await axios.get('/auth/logout');
        console.log(res);
        return res;

    }
    catch(err){
        
        console.log(err.res);}
    }




export  {login,logout};