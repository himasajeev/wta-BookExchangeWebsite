import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import InnerNavbar from '../Components/InnerNavbar'
import getUser from '../actions/getUser'
import {userinfo} from "../Api-requests/userRequests"
import Sidebox from "../Components/Sidebox"
import Book from "../Components/Book"
import OwnedBooks from "../Containers/OwnedBooks"
import Cart from "../Containers/Cart"
import image from "../assets/images/uploadbk.jpg"
const Profile = ()=>{
    const [redirect,setRedirect] = useState(false);
    const [user,setUser] = useState({});
   
    const getProfile =async ()=>{
        console.log("...lo0ading username")
        const username =  getUser();
        console.log(username)
        console.log("inside getprofile")
        if(username)
       {  const res = await userinfo(username);
           setUser(res.data);
           console.log(res);
           
        }
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
    return(<div className="profile"> 
  
    <Sidebox fn={user.Fname} sn={user.Lname} username={user.username} mail={user.email}/>
    <InnerNavbar username={user.username} />
    <div className="main">
    {/* <p>Hii {user.username}</p> */}
    {/* <Book title="Intro to algo" author="Thomas Corman" price="500" img={image}/> */}
    <div className="cart"> 
     <h2>Cart</h2>
    <Cart username={user.username} />
    </div>
    <div className="ownedbooks">
    <h2>Uploaded</h2>
    <OwnedBooks className="ownedbooks" username={user.username}/>
    </div>
    
    
    </div>
    
    </div>)
}
export default Profile;