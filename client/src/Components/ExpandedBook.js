import React,{useState,useEffect, Fragment} from 'react'
import {bookById,getOwnerInfo} from '../Api-requests/bookRequests'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import getUser from '../actions/getUser'
import InnerNavbar from '../Components/InnerNavbar'
import handleAddToCart from "../actions/handleAddToCart"
const ExpandedBook = (props)=>{
    const [book,setBook] = useState({
      author:'',
      available:false,
      bookname:'',
      price:'',
      subject:'',
      id:''
    })
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
            //console.log(process.env.PUBLIC_URL +'/images/uploads/'+ bookid + '.PNG')
           await  bookById(bookid).then((res)=>{
             console.log(res.data)
                setBook(res.data)
               });
        
            
        } 
        getBook()
        
    },[])
   
    
      
return(
 <Fragment>
    <InnerNavbar username={user}/>
    <div className="expandedBook">
    <img src={process.env.PUBLIC_URL+'/images/uploads/'+book.imagepath }></img>
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
            Owner:{owner.username}
            
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            Contact Info:{owner.email}
            {/* Contact info: nithyamanoj.ms@gmail.com */}
            </Typography>
            <Typography gutterBottom variant="body2" color="primary" component="h5">
            Price: {book.price}
            </Typography>
            { book.available ===0 ?<Typography gutterBottom variant="h4" color="secondary" component="h2">
            Not Available
            </Typography> : <Typography gutterBottom variant="h4" color="secondary" component="h2">
             Available
            </Typography>
            }
            <Button
            onClick={()=>{handleAddToCart(book.id)} }
          variant="contained"
          color="default"
          startIcon={<AddIcon/>}
          
      >Add to Cart!</Button>
        
    </div>
 </Fragment>
   
)
}
export default ExpandedBook;