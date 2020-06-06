import React from 'react'
import {Link} from 'react-router-dom'
import '../../src/Style.css'
const OuterNavbar = ()=>{
    return (<div className="navbar">
        <ul>
            <li><Link to="/">Home </Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </ul>
    </div>)
}
export default OuterNavbar;