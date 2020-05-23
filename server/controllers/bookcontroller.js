

const {QueryTypes} = require('sequelize');
const db = require("../models");
const list = (req,res)=>{
    return  db.sequelize.query('SELECT * FROM book ORDER BY id DESC LIMIT 10 ')
        .then(books=>{
                return res.status(200).json(books)
        })
        .catch(err=>{
            throw err
        })
}

const addBook = (req,res) =>{
    const username = req.user.username;
    let User=null
    return db.User.findOne({username})
        .then(user=>{
            User=user
            return db.book.create({
                bookname:req.body.title,
                author:req.body.author,
                price:req.body.price,
                available:1
            })
        })
        .then(results=> {
            db.book_belongs_to.create({
                bookid:results.id,
                Userid:User.id
            })
        console.log(results)
        return res.status(200).json({
            message: "Successfully added the book!"
        })
            .catch(err=>{
            throw err;})
    })
}
const update = (req,res) =>{
    const book = req.book; //this contains the original book
    // req will have values for fields to be updated
    // update those fields,maintain everything else
    res.status(501).json("under construction!")
}
const Delete =async (req,res)=>{
    const bookid = req.book.id;
    const userid=req.user.userid;
    await db.sequelize.query(
        'UPDATE book WHERE id =? SET available=0',
        {
            replacements: [bookid],
            type: QueryTypes.SELECT
        }
    ).then(books => {
        db.book_bought_by.create({
            bookid:bookid,
            Userid:userid
            })
        })
        .then(books => {
            //console.log(books)
            return res.status(200).json(books);

        })
         .catch(function(err) {
        return  res.status(422).json({error:err});
    });
}

const ownerInfo = (req,res) =>{
    const book = req.book;
    return db.sequelize.query(
        'SELECT * FROM User WHERE id IN (select Userid from book_belongs_to where bookid=?)',
        {
            replacements: [book],
            type: QueryTypes.SELECT
        }
    ).then(books => {
        //console.log(books)
        return res.status(200).json(books);

    }).catch(function(err) {
        return  res.status(422).json({error:err});
    });
    res.status(501).json("under construction!")
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
    const username = req.params.username;
    await db.sequelize.query(
        'SELECT * FROM book WHERE id IN (SELECT bookId from book_belongs_to where UserId IN (SELECT id FROM User WHERE username=?))',
        {
            replacements: [username],
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