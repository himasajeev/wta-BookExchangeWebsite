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
import {isBookofUser,inCartofUser} from "../Api-requests/bookRequests"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import getUser from "../actions/getUser"

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
      // inCartofUser(props.id)
      // .then((res)=>{
      //   if(res.status === 200){
      //   setIncart(res.data);
      //   }
      // })
    },[inCart])
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
          image={process.env.PUBLIC_URL+'/images/uploads/'+props.imagepath} //change llater
          title="Book"
        />
         {/* <div className=" dropdown2">
            <button className="dropbtn2">
            <i className="fa fa-caret-down" ></i>
            </button>
            <div className="dropdown-content">
            <li></li>
            <li> </li>
            </div>
            </div> */}
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
        {/* </CardActionArea> */}
      <CardActions>
        <IconButton aria-label="view details" onClick={handleClick}>
        <AddIcon/>
        </IconButton>
        <IconButton color={inCart?"primary":""} aria-label="add to cart" onClick={addtoCart}>
        <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </Card>
    </div>
   )}
  }
export default Book;