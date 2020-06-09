import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Redirect} from "react-router-dom"
import handleAddToCart from "../actions/handleAddToCart"


import '../../src/Style.css'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
       height:400,
    },
    media: {
      height: 150,
      
    },
  });


const Book = (props)=>{
  const path = "books/"+props.id;
  
  const [redirect,setRedirect] = useState(false)
    const classes = useStyles();
    const handleClick = ()=>{
      setRedirect(true);
      }
      const addtoCart =()=>{
        
        console.log(props.id)
        // if(props.inCart)
        // deletefromCart(props.id)
        // else
         handleAddToCart(props.id)
      }
      console.log(props.img)
if(redirect)
    {
   return( <Redirect to={path}/>)}
   else
  return (
    <div className="book">
     <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL+'/images/uploads/'+props.imagepath} //change llater
          title="Book"
        />
        <CardContent>
          <Typography gutterBottom="true" variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.author}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
          Rs {props.price}
          </Typography>
          
        </CardContent>
        </CardActionArea>
      <CardActions>
        <IconButton aria-label="view details" onClick={handleClick}>
        <AddIcon/>
        </IconButton>
        <IconButton aria-label="add to cart" onClick={addtoCart}>
        <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </Card>
    </div>
   )}
//     return( 
//     {/* <p id="title"><b>{props.title}</b><img src="bookdisp.jpg" alt="book"/></p>
//     <div class="detail">

//     </div> */}
    

// }
export default Book;