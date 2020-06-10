

const {QueryTypes} = require('sequelize');
const db = require("../models");
import formidable from "formidable"
import fs from "file-system"

 const list= (req,res)=>{
    return  db.sequelize.query('SELECT * FROM book ORDER BY id DESC LIMIT 10 ',{ type: QueryTypes.SELECT })
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
       console.log(req.body);
    console.log(req.body.title)
    console.log(req.file)
                db.book.create({
                    bookname:req.body.title,
                    author:req.body.author,
                    price:req.body.price,
                    available:1,
                    subject:req.body.sub,
                    imagepath:req.file.filename
                }).then(rslts=>
                {   console.log(rslts)
                     db.book_belongs_to.create({
                        bookId:rslts.id,
                        UserUsername:req.user.username
                    })
                    .then(()=>{
                        console.log("success")
                        return res.status(200).json({message:"success"})
                       })
                    .catch(err=>{
                        console.log("chpt 3")
                        return  res.status(422).json({error:err});
                    })
                })
                .catch(err=>{
                    console.log("chpt 4")
                    console.log(err)
                    return  res.status(422).json({error:err});
                })
            }
           
   
const update = (req,res) =>{

     return db.book.update({price:req.book.price,bookname:req.book.title,author:req.book.author,subject:req.book.subject},{where:{id:req.book.id}})
         .then(book=>{
             return res.status(200).json({message:"price updated successfully"})
            })
         .catch(err=>{
             //return  res.status(422).json({error:err});
        })
}
const Delete = (req,res)=>{

    const bookid = req.book.id;
     db.sequelize.query(
        'UPDATE book SET available=0 WHERE id =? ',
        {
            replacements: [bookid],
            type: QueryTypes.UPDATE
        }
    ).then(()=>{
        return res.status(200).json("success");
    }
        
    )
     .catch(err=> {
             console.log(err)
        return  res.status(422).json({error:err});
    });
}

const ownerInfo = (req,res) =>{
    const bookid = req.book.id;
    return db.sequelize.query(
        'SELECT * FROM Users WHERE username IN (select UserUsername from book_belongs_to where bookId=?)',
        {
            replacements: [bookid],
            type: QueryTypes.SELECT
        }
    ).then(user => {
        console.log(user)
        return res.status(200).json(user);

    }).catch(function(err) {
        console.log(err)
        return  res.status(422).json({error:err});
    });
}
const read = (req,res)=>{
    const book = req.book;
    res.status(200).json(book);
}

const FindBookByName = (req,res)=> {
    const bookname = req.params.bookname;
    return db.sequelize.query(
        'SELECT * FROM book WHERE bookname LIKE :search_name',
        {
            replacements: {search_name: '%' + bookname + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return res.status(200).json(books);

    }).catch(function(err) {
        console.log("erroooorr")
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
    }).catch(err=> {
        return  res.status(422).json({error:err});
         });
}


const FindBookBySub = async function (req,res) {
    const sub = req.params.sub;
    await db.sequelize.query(
        'SELECT * FROM book WHERE subject LIKE  :search_name',
        {
            replacements: {search_name: '%' + sub + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return res.status(200).json(books);
    }).catch(function(err) {
        console.log(err)
        return  res.status(422).json({error:err});
         });
}

const  BooksOfUser =async function(req,res) {
    const username = req.params.userid;
    console.log(username);
    await db.sequelize.query(
        'SELECT * FROM book WHERE id IN (SELECT bookId from book_belongs_to where UserUsername =?)',
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
const isBookofUser = async function(req,res){
    // console.log(req.body)
    // const bookid = req.body.bookId;
    // const username = req.body.username;

    // let isbook;
    // await db.sequelize.query(
    //   'CALL isBookofUser(:name,:id,@isbook)',
    //   {replacements :{name:"nithya0903",id:20}}
    //   )
    //   .then(isBook=>
    //   {   console.log(isbook)
    //     console.log(isBook)
    //       return res.status(200).send(isBook);
    //   })
    //   .catch(function(err) {
    //     console.log(err)
    //     return  res.status(422).json({error:err});
    //      });
}
      

export default {FindBookByAuthor, isBookofUser,FindBookByName, FindBookBySub, BooksOfUser,isOwner,bookById,read,list,addBook,update,Delete,ownerInfo}
