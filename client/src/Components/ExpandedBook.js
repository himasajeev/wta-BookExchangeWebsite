import React,{useState,useEffect} from 'react'
import {bookById,getOwnerInfo} from '../Api-requests/bookRequests'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import image from "../assets/images/uploadbk.jpg"
import i1 from "../assets/uploads/1.PNG"
import i2 from "../assets/uploads/2.PNG"
import i3 from "../assets/uploads/3.PNG"
import i4 from "../assets/uploads/4.PNG"
import i5 from "../assets/uploads/5.PNG"
import i6 from "../assets/uploads/6.PNG"
import InnerNavbar from '../Components/InnerNavbar'
const useStyles = makeStyles({
    root: {
    display:"block",
      maxWidth: "60%",
      maxHeight:"40%",
     margin:"auto",
     marginTop:"20px",
     textAlign:"center"
    },
    media: {
     
      height:"250px",
    },
  });
const ExpandedBook = (props)=>{
    const [book,setBook] = useState({})
    const [owner,setOwner] = useState({})
    let bookid;
    useEffect( ()=>{
       bookid = props.match.params.bookid;
        async function getBook(){
            await getOwnerInfo(bookid).then((res)=>{
                setOwner(res.data[0])
                console.log(owner)
                console.log("After owner")
            })
           await  bookById(bookid).then((res)=>{
                setBook(res.data)
               });
        
            
        } 
        getBook()
        
    },[])
   
      const classes = useStyles();
      let image = i1;
   if(bookid === 1)
   image = i1;
  if(bookid === 2)
    image = i2;
  else if(bookid === 3)
  image = i3;
  else if(bookid ===4)
  image = i4;
  else if(bookid === 5)
  image = i5;
  else if(bookid ===6)
  image = i6;
return(
  <div className="expandedBook">
    <InnerNavbar />
    {/* <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={i4}
        //   image={book.imagepath}
        />
          
    </Card> */}
    <img src={i4}></img>
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
            Owner:Priyanka B G
            </Typography>
            <Typography gutterBottom variant="body1" color="primary" component="h3">
            {/* Contact Info:{owner.email} */}
            Contact info: priyahem7@gmail.com
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