import React,{useEffect,useState,useRef} from 'react'
import {ownedbooks} from "../Api-requests/bookRequests"
import TableBox from "../Components/TableBox"
import getUser from '../actions/getUser'
import Book from '../Components/Book'
const OwnedBooks= ()=>{
    const [Books,setBooks] = useState([]);
    const getBooks = async ()=>{
        const username =  getUser();
        await ownedbooks(username).then((res)=>{
            if(res.status===200)
            {//console.log(res.data)
            setBooks(()=>{
            return [...res.data]
            })
            
           }
        })
           
    }
   
    useEffect(()=>{
      
        getBooks();
        
        },[]);
    
     return (<div className="owned">
        
        <TableBox Books={Books}/>
    </div>)
}
export default OwnedBooks;