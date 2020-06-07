import React,{useState,useEffect} from 'react'
import {bookById,getOwnerInfo} from '../Api-requests/bookRequests'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import image from "../assets/images/uploadbk.jpg"
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
    useEffect( ()=>{
        const bookid = props.match.params.bookid;
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
      console.log(owner)
return(
    <div>
    <InnerNavbar />
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
        //   image={book.imagepath}
        />
        <CardContent>
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
            </Typography>
            <Typography gutterBottom variant="body2" color="primary" component="h5">
            Price: {book.price}
            </Typography>
            { book.available ===0 ?<Typography gutterBottom variant="h4" color="secondary" component="h2">
            Not Available
            </Typography> : null
            }
        </CardContent>
    </Card>
        
    </div>
)
}
export default ExpandedBook;