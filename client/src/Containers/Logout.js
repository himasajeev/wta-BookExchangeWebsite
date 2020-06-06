import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = (props) => {
    const [logged,setLogged] = useState(true);
    const handleClick =()=>{
    localStorage.removeItem('username');
   // props.history.push('/');
   setLogged(false);
    }
    if(!logged)
    return(
        <Redirect to="/" push={true}/>
    );
    else
    return(<button onClick={handleClick}>Log Out</button>);
}

export default Logout;