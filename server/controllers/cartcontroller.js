

const {QueryTypes} = require('sequelize');
const db = require("../models");

const list= (req,res)=>{
    return  db.sequelize.query('SELECT * FROM cart ORDER BY id DESC LIMIT 10 ',{ type: QueryTypes.SELECT })
        .then(books=>{
                console.log(books)
                return res.status(200).json(books)
        })
        .catch(err=>{
            return  res.status(422).json({error:err});
        })
}

const addBook = (req,res) =>{
    
    const username = req.user.username;
    console.log(username);
    db.User.findOne({username})
        .then(user=>{
            if(!user){
                return res.status(200).json({message:"user not found"})
            }
           db.cart.create({
                bookId:req.body.bookid,
                UserUsername:req.user.username,
               
            }).then(()=>{ 
                 return res.status(200).json({message:"book added successfully to cart"}) 
            })
            .catch(err=>{
                return  res.status(422).json({error:err});
            })
    })
    .catch(err=>{
        return  res.status(422).json({error:err});
    })
}
const  BooksOfUser =async function(req,res) {
    const username = req.params.userid;
    console.log(username);
    await db.sequelize.query(
        'SELECT * FROM book WHERE id IN (SELECT bookId from cart where UserUsername =?)',
        {
            replacements: [username],
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        console.log("np")
        return res.status(200).json(books);
    }).catch(function(err) {
        console.log(err)
        return  res.status(422).json({error:err});
         });
}
const BookPresent=async function(req,res){
  const bookid=req.params.bookid;
  await db.sequelize.query(
      'SELECT * FROM cart WHERE bookId=?',
      {
          replacements: [bookid],
          type: QueryTypes.SELECT
      }
  ).then(books => {
    //if(books.length)
    //  return 1
      //console.log(books)
      //console.log("np")
      return res.status(200).json(books);
  }).catch(function(err) {
      console.log(err)
      return  res.status(422).json({error:err});
       });
}

export default{BooksOfUser,list,addBook,BookPresent};
