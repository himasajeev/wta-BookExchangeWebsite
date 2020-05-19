

const {QueryTypes} = require('sequelize');
const db = require("../models");
const list = (req,res)=>{
    // write query to list some books to populate feed like the latest 10 books pushed 
    res.status(501).json("under construction!")
}

const addBook = (req,res) =>{
    const username = req.user.username; 
    //add book with owner as this particular user
    //i will handle the image part later,for now populate image path with some const
    res.status(501).json("under construction!")
}
const update = (req,res) =>{
    const book = req.book; //this contains the original book
    // req will have values for fields to be updated
    // update those fields,maintain everything else
    res.status(501).json("under construction!")
}
const Delete = (req,res)=>{
    const book = req.book; //this contains the original book
    //delete this particular book from db
    //Make sure to  cascade delete from associated tables too
    
    res.status(501).json("under construction!")
}
const ownerInfo = (req,res)=>{
    const book = req.book;
    //return name and contact info of owner
    res.status(501).json("under construction!")
}
const read = (req,res)=>{  
    const book = req.book;
    res.status(200).json(book);
}

const FindBookByName =async function (req,res) {
    const bookname = req.params.bookname;
    await db.sequelize.query(
        'SELECT * FROM book WHERE bookname LIKE :search_name',
        {
            replacements: {search_name: '%' + bookname + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        //console.log(books)
        return res.status(200).json(books);
    
    }).catch(function(err) {
        return  res.status(422).json({error:err}); 
         });

}
const bookById = async (req, res, next,id) => {
    try {
        console.log("heyyy");
        console.log(id);
        
      let book = await db.book.findOne({
          where :{id :id}
      });
      if (!book)
        return res.status('400').json({
          error: "Book not found"
        })
      req.book = book
      next()
    } catch (err) {
      return res.status('400').json({
        error: err
      })
    }
}
const isOwner = (req, res, next) => {
    const isOwner = req.book && req.user.username == req.book.owner
    if(!isOwner){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }
const FindBookByAuthor =async function (req,res) {
      const author = req.params.author;
    await db.sequelize.query(
        'SELECT * FROM book WHERE author LIKE :search_name',
        {
            replacements: {search_name: '%' + author + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return res.status(200).json(books);
    }).catch(function(err) {
        return  res.status(422).json({error:err}); 
         });
}


const FindBookBySub = async function (req,res) {
    const sub = req.params.sub;
    await db.sequelize.query(
        'SELECT * FROM book WHERE subject LIKE :search_name',
        {
            replacements: {search_name: '%' + sub + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return res.status(200).json(books);
    }).catch(function(err) {
        return  res.status(422).json({error:err}); 
         });
}

const  BooksOfUser =async function(req,res) {           
    const userid = req.params.id;
    await db.sequelize.query(
        'SELECT * FROM book WHERE id IN (SELECT bookId from book_belongs_to where UserId=?)',
        {
            replacements: [userid],
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return res.status(200).json(books);
    }).catch(function(err) {
        return  res.status(422).json({error:err}); 
         });
}

export default {FindBookByAuthor, FindBookByName, FindBookBySub, BooksOfUser,isOwner,bookById,read,list,addBook,update,Delete,ownerInfo}