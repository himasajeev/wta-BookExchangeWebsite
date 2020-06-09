import React,{useState,useEffect} from 'react'
import {bookById,getOwnerInfo} from '../Api-requests/bookRequests'
import Typography from '@material-ui/core/Typography';
import getUser from '../actions/getUser'
import InnerNavbar from '../Components/InnerNavbar'

const ExpandedBook = (props)=>{
    const [book,setBook] = useState({})
    const [owner,setOwner] = useState({})
    const [user,setUser] = useState(' ')

    let bookid;
    useEffect( ()=>{
      const username  = getUser();
      setUser(username);
       bookid = props.match.params.bookid;
        async function getBook(){
            await getOwnerInfo(bookid).then((res)=>{
                setOwner(res.data[0])
                console.log(owner)
                console.log("After owner")
            })
            console.log(process.env.PUBLIC_URL +'/images/uploads/'+ bookid + '.PNG')
           await  bookById(bookid).then((res)=>{
             console.log(res.data)
                setBook(res.data)
               });
        
            
        } 
        getBook()
        
    },[])
   
    
      
return(
  <div className="expandedBook">
    <InnerNavbar username={user}/>
   
    <img src={process.env.PUBLIC_URL+'/images/uploads/'+book.id+'.PNG' }></img>
          <Typography gutterBottom variant="h4" color="secondary" component="h2">
            {book.bookname}
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            Author:{book.author}
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            Subject:{book.subject}
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            {/* Owner:{owner.username} */}
            Owner:Nithya 
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            {/* Contact Info:{owner.email} */}
            Contact info: nithyamanoj.ms@gmail.com
            </Typography>
            <Typography gutterBottom variant="body2" color="primary" component="h5">
            Price: {book.price}
            </Typography>
            { book.available ===0 ?<Typography gutterBottom variant="h4" color="secondary" component="h2">
            Not Available
            </Typography> : null
            }
      
        
    </div>
)
}
export default ExpandedBook;