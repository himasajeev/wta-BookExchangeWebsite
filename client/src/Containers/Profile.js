import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import getUser from '../actions/getUser'
const Profile = ()=>{
    const [redirect,setRedirect] = useState(false);
    const [user,setUser] = useState('');
    const handleLogout = ()=>{
        localStorage.removeItem('username');
        setRedirect(true);
    }
    const getProfile = ()=>{
        console.log("...loading username")
        const username =  getUser();
        console.log(username)
        console.log("inside getprofile")
        if(username)
       {   
           setUser(username);}
        else{
            setRedirect(true);
        }
    }
    useEffect(()=>{
    const abortController = new AbortController()
    const signal = abortController.signal
        getProfile();
   return ()=>{
    abortController.abort();
   }
    },[]);
    
    if(redirect)
    {console.log("Not authenticated");
    
   return( <Redirect to='/'/>)}
   else
    return(<div> 
    <p>Hii {user}</p>
    <button onClick={handleLogout}>Logout</button>
    </div>)
}
export default Profile;