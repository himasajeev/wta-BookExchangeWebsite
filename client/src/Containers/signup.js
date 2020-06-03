import React,{useState} from 'react'
import OuterNavbar from '../Components/OuterNavbar'
import '../Style.css'
const Signup = ()=>{
    const [user,setUser] = useState({
        username:'',
        password:'',
        fn:'',
        ln:'',
        mailid:''
    })
 const handleChange = (event)=>{
        const target = event.target;
        
    setUser(prev=>{
        
        return {...prev,[target.name]:target.value}
    })
    }
   const handleSubmit = (event)=>{
       event.preventDefault();
       console.log(user)
   }
    return (<div>
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

          </div>
    </div>)
}
export default Signup;