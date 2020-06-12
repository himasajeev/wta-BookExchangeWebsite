import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    color: "white",
    padding: "5px 20px",
    border: "1px solid transparent"
  
  },
}));
const Logout = (props) => {
    const classes= useStyles()
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
    return(<Button className="classes.root" onClick={handleClick}>Log Out</Button>);
}

export default Logout;