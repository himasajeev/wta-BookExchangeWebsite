import React,{useState,useEffect, Fragment} from 'react'
import {bookById,getOwnerInfo,sendmail} from '../Api-requests/bookRequests'
import Typography from '@material-ui/core/Typography';
import getUser from '../actions/getUser'
import InnerNavbar from '../Components/InnerNavbar'

const ExpandedBook = (props)=>{
    const [book,setBook] = useState({
      author:'',
  
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
            
                setOwner(res.data)
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
   
    const handleMail = async ()=>{
    await sendmail(book.id).then((res)=>{
      if(res.status===200)
      alert("successfully sent mail to owner")
    })
    }
      
return(
 <Fragment>
    <InnerNavbar username={user}/>
    <div className="expandedBook">
    <img src={process.env.PUBLIC_URL+book.imagepath }></img>
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
           
            <p> Click to request book!!</p>
            <button onClick={handleMail}> Send email</button>        
    </div>
 </Fragment>
   
)
}
export default ExpandedBook;