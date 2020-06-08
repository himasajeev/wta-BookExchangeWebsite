import React,{useState} from 'react'
import OuterNavbar from '../Components/OuterNavbar'
import {signup} from "../Api-requests/userRequests"
import {Redirect} from "react-router-dom"
import '../Style.css'
const Signup = ()=>{
    const [user,setUser] = useState({
        username:'',
        password:'',
        fn:'',
        ln:'',
        mailid:'',
        error:'',
        redirect:false
    })
 const handleChange = (event)=>{
        const target = event.target;
        
    setUser(prev=>{
        
        return {...prev,[target.name]:target.value}
    })
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(user);
        signup(user).then((res)=>{
            
            if(res.status !== 200)
            {setUser(prev=> {return {...prev,error:"error"}});
            console.log(res);
            }
            else
            {console.log("...signing up");
            localStorage.setItem('username', user.username);
            setUser(prev=>{return{...prev,error:'',redirect:true}});}
        });
    };
    const {redirect} = user;
    if (redirect) {
        return (<Redirect to='/profile'/>)
    }
    else
    return (<div className="in">
        <OuterNavbar />
        <div className="signup-box">
              <h1>Sign up</h1>
              <div className="text-box">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <input onChange={handleChange}type="text" placeholder="Firstname" name="fn"/>
              </div>
              <div className="text-box">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <input onChange={handleChange}type="text" placeholder="Lastname" name="ln"/>
              </div>
              <div className="text-box">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input onChange={handleChange}type="email" placeholder="Email" name="mailid" />
              </div>
              <div className="text-box">
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <input onChange={handleChange}type="text" placeholder="Username" name="username"/>
              </div>
              <div className="text-box">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input onChange={handleChange}type="password" placeholder="Password" name="password"/>
              </div>

          <button onClick={handleSubmit}className="button" type="submit" >Sign up</button> 
          {user.error? <p>{user.error}</p> : null}

          </div>
    </div>)
}
export default Signup;