import React,{useState,useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InnerNavbar from '../Components/InnerNavbar'
import {bookByName,bookByAuthor,bookBySubject} from "../Api-requests/bookRequests"
import TableBox from "../Components/TableBox"
import getUser from '../actions/getUser'
import Book from '../Components/Book'
const Search = ()=>{
    const style={
        width:"400px"
    }
    const [books,setBooks] = useState([]);
   const [user,setUser] = useState('')
    useEffect(()=>{
        
            const username  = getUser();
            setUser(username);
            console.log(username)
        
         
    })
    const handleSubmit =async (event)=>{
        event.preventDefault();

        const type =event.target.type.value;
        const searchString = event.target.searchbar.value;
        console.log(type);
        if(type === 0)
        alert("Select a search type!")
        else if(searchString.length==0)
        alert("Search string can't be empty")
        else
        { console.log("inside main else")
        console.log(type)
            if(type == 1)
            {console.log("inside 1.")
                await bookByName(searchString).then((res)=>{
                    if(res.status===200)
                    {//console.log(res.data)
                    setBooks(()=>{
                    return [...res.data]
                    })}
                })
                        
            }
            else if (type==2){
                console.log("inside 2.")
                await bookByAuthor(searchString).then((res)=>{
                    if(res.status===200)
                    {//console.log(res.data)
                    setBooks(()=>{
                    return [...res.data]
                    })}
                })
            }
            else if(type == 3){
                console.log("inside 3.")
                await bookBySubject(searchString).then((res)=>{
                    if(res.status===200)
                    {//console.log(res.data)
                    setBooks(()=>{
                    return [...res.data]
                    })}
                })
            }
        }
    }
    
    return(<div>
    <InnerNavbar  username={user}/>
    <form className="searchdiv" onSubmit={handleSubmit}>
    <div className="custom-select" style={style}>
  <select name="type">
    <option value="0">Search by</option>
    <option value="1">Title</option>
    <option value="2">Author</option>
    <option value="3">Subject</option>
  </select>
  
    <input id="searchbar" 
     type="text" placeholder="Search.."></input>
    <IconButton
     type="submit"
      color="primary">
        <SearchIcon />
      </IconButton>
      </div>
    </form>
   <TableBox Books={books} />
    </div>)
}
export default Search;