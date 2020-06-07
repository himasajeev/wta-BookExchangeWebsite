

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
     db.User.findOne({username})
        .then(user=>{
            if(!user){
                return res.status(200).json({message:"user not found"})
            }
            else{
                console.log("inside 2nd")
                let form = new formidable.IncomingForm()
                form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
            console.log(form)
            if (err) {
            return res.status(400).json({
                message: "Image could not be uploaded"
            })}
            else{console.log(fields)
                console.log(files)
                console.log("chpt 2")
                fs.copyFile(files.image.path,'/src/assets/image/uploads/'+rslts.id, {
                    done: function(err) {
                      console.log('done');
                      return res.status(200).json({message:"book added successfully"})
                    }
                  });
                }  
            })
                // console.log("chpt 1");
                // console.log(req.body)
                // db.book.create({
                //     bookname:req.body.title,
                //     author:req.body.author,
                //     price:req.body.price,
                //     available:1,
                //     subject:req.body.sub,
                //     imagepath:"/src/assets/image/uploads"
                // }).then(rslts=>
                // {   console.log(rslts)
                //      db.book_belongs_to.create({
                //         bookId:rslts.id,
                //         UserUsername:req.user.username
                //     })
                //     .then(()=>{
                //        })
                //     .catch(err=>{
                //         console.log("chpt 3")
                //         return  res.status(422).json({error:err});
                //     })
                // })
                // .catch(err=>{
                //     console.log("chpt 4")
                //     return  res.status(422).json({error:err});
                // })
            }
           
        });
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
export default {FindBookByAuthor, FindBookByName, FindBookBySub, BooksOfUser,isOwner,bookById,read,list,addBook,update,Delete,ownerInfo}
