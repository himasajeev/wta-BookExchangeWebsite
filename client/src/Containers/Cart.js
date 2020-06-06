import React,{useEffect,useState} from 'react'
import {favouritebooks} from "../Api-requests/bookRequests"
import TableBox from "../Components/TableBox"
import getUser from '../actions/getUser'
import Book from '../Components/Book'
const Cart= ()=>{
    const [Books,setBooks] = useState([]);
    const getBooks = async ()=>{
        const username =  getUser();
        await favouritebooks(username).then((res)=>{
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
    
     return (<div>
        <h2>Your Favourites</h2>
        <TableBox Books={Books}/>
    </div>)
}
export default Cart;