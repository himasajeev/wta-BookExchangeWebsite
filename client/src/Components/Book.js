import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import StarsIcon from '@material-ui/icons/Stars';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Redirect} from "react-router-dom"
import handleAddToCart from "../actions/handleAddToCart"
import deleteFromCart from "../actions/deleteFromCart"
import deleteBook from "../actions/deleteBook"
import {isBookofUser,inCartofUser} from "../Api-requests/bookRequests"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import getUser from "../actions/getUser"

import '../../src/Style.css'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
       height:450,
    },
    media: {
      height: 150,
      
    },
  });


const Book = (props)=>{
  const path = "books/"+props.id;
  const [redirect,setRedirect] = useState(false)
  const [inCart,setIncart] = useState(false)
  const [isUsers,setIsusers] = useState(false)
  
    const classes = useStyles();
    useEffect(()=>{
      const username =getUser();
      isBookofUser(props.id)
      .then((res)=>{
        if(res.status === 200){
        setIsusers(res.data);
        }
      });
      inCartofUser(props.id)
      .then((res)=>{
        if(res.status === 200){
        setIncart(res.data);
        }
      })
     
    },[inCart])
    const handleClick = ()=>{
      setRedirect(true);
      }
      const handleCart =()=>{
        
        console.log(props.id)
        if(!inCart)
         handleAddToCart(props.id)
         else
         deleteFromCart(props.id)
      }
      const handleDelete = ()=>{
       deleteBook(props.id)
      }
      
      
if(redirect)
    {
   return( <Redirect to={path}/>)}
   else{
  return (
    <div className="book">
     <Card className={classes.root}>
      {/* <CardActionArea> */}
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL+props.imagepath} //change llater
          title="Book"
        />
        
   
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          {isUsers? <StarsIcon/> : null}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.author}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
          Rs {props.price}
          </Typography>
          
        </CardContent>
       
      <CardActions>
        <IconButton aria-label="view details" onClick={handleClick}>
        <AddIcon/>
        </IconButton>
        {inCart?
        <IconButton color="primary"
        aria-label="add to cart" onClick={handleCart}>
        <FavoriteIcon/>
        </IconButton>
        :
        <Button
            onClick={handleCart} 
          variant="contained"
          color="default"     
      >Add to Cart</Button>}
        {isUsers? <Button
            onClick={handleDelete} 
          variant="contained"
             
      >Delete Book</Button>:null}
      </CardActions>
    </Card>
    </div>
   )}
  }
export default Book;