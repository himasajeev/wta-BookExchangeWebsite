import React from 'react'
import {Link} from 'react-router-dom'
import Logout from '../Containers/Logout'
import '../../src/Style.css'
const InnerNavbar = (props)=>{
    return (<div className="navbar inner">
        <ul>
            <li><Link to="/">Home </Link></li>
            <div className="right dropdown">
            <button className="dropbtn">{props.username}
            <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
            <li><Link to="/profile">Profile</Link></li>
            <li><Logout/></li>
            </div>
            </div>
            
            <li className="right"><Link to="/addbook">Addbook</Link></li>
            <li className="right" ><Link to="/search">Search</Link></li>
            <li className="right" ><Link to="/recommendations">Recommendations</Link></li>

        </ul>
    </div>)
}
export default InnerNavbar;