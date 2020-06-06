import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from "../assets/images/uploadbk.jpg"
import '../../src/Style.css'
const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      maxheight:200
    },
    media: {
      height: 100,
      left:0
    },
  });
  
  
const Book = (props)=>{
    const classes = useStyles();

  return (
    <div className="book">
     <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image} //change llater
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
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
      
    </Card>
    </div>
   )}
//     return( 
//     {/* <p id="title"><b>{props.title}</b><img src="bookdisp.jpg" alt="book"/></p>
//     <div class="detail">

//     </div> */}
    

// }
export default Book;