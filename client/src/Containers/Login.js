import React,{useState} from 'react'
import OuterNavbar from '../Components/OuterNavbar'
import {Redirect} from 'react-router-dom'
import {login} from '../Api-requests/authRequests'

import '../Style.css'
const Login = ()=>{
    const [user,setUser] = useState({
        username:'',
        password:'',
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
        login(user).then((res)=>{
            
            if(res.data.error)
            setUser(prev=> {return {...prev,error:res.data.error}});
            else
            {console.log("...loading profile");
            localStorage.setItem('username', user.username);
            setUser(prev=>{return{...prev,error:'',redirect:true}});}
        });
    };
    const {redirect} = user;
  if (redirect) {
      return (<Redirect to='/profile'/>)
  }
    return (

        <div className="in">
            <OuterNavbar />

            <div className="login-box">
              <h1>Login</h1>
              <div className="text-box">
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <input onChange={handleChange}type="text" value={user.username} placeholder="Username" name="username" />
              </div>
              <div className="text-box">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input onChange={handleChange}type="password" value={user.password} placeholder="Password" name="password" />
              </div>

          <button onClick={handleSubmit} className="button" type="submit" >Sign in</button>
          {user.error? <p>{user.error}</p> : null}
          </div>

        </div>
    )
}
export default Login;
