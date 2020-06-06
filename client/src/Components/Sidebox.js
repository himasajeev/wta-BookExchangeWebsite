import React from 'react'
import '../../src/Style.css'
const Sidebox = (props)=>{
    return (<div className="sidenav">
        <h2>{props.fn} {props.sn}</h2>
        <i>
        <p>{props.username}</p>
        <p>{props.mail}</p>
        </i>
        
        {/* <h2>Nithya Manoj</h2>
        <i>
        <p>user4</p>
        <p>nithyamanoj.ms@gmail.com</p> 
        </i> */}
        
    </div>)
}
export default Sidebox;