

const {QueryTypes} = require('sequelize');
const db = require("../models");



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
    
  
                db.book.create({
                    bookname:req.body.title,
                    author:req.body.author,
                    price:req.body.price,
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
console.log("insid delete");

    const bookid = req.book.id;
     db.sequelize.query(
        'DELETE FROM book WHERE id =? ',
        {
            replacements: [bookid],
            type: QueryTypes.UPDATE
        }
    )

        

    .then(()=>{
              return res.status(200).json("success");
                })
     .catch(err=> {
             console.log(err)
        return  res.status(422).json({error:err});
    });
}

const ownerInfo = async (req,res) =>{
    const bookid = req.book.id;

    db.sequelize.query(
        'CALL ownerInfo(?)',
        {
            replacements: [bookid],
            type: QueryTypes.SELECT
        }
    )
    .then(user => {
      
        return res.status(200).json(user[0]['0']);

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
    console.log(bookname)
     db.sequelize.query(
        'CALL Bookbytitle(?)',
        {
            replacements: [bookname],
            type: db.Sequelize.QueryTypes.SELECT
        }
    ).spread(books => {
        console.log(books)
        //const bookArray = Object.keys(books).map(book=>books(book));
        
        const Books = Object.values(books);
        console.log(Object.values(books))
        
      
        return res.status(200).json(Books);

    }).catch(function(err) {
        console.log("erroooorr")
        return  res.status(422).json({error:err});
         });

}
const bookById = async (req, res, next,id) => {
    try {
      //  console.log("heyyy");
      //  console.log(id);

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
const isOwner =async (req, res, next) => {
   
    let owner = await db.book_belongs_to.findOne({
        where :{id :req.book.dataValues.id}
    });
    console.log(req.book,owner)
   console.log(req.user.username)
   console.log(req.book.dataValues.id)
    if(owner === req.user.username){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }
const FindBookByAuthor =async function (req,res) {
      const author = req.params.author;
      db.sequelize.query(
        'CALL Bookbyauthor(?)',
        {
            replacements: [author],
            type: db.Sequelize.QueryTypes.SELECT
        }
    ).spread(books => {
        console.log(books)
        //const bookArray = Object.keys(books).map(book=>books(book));
        
        const Books = Object.values(books);
        console.log(Object.values(books))
        
      
        return res.status(200).json(Books);

    }).catch(function(err) {
        console.log("erroooorr")
        return  res.status(422).json({error:err});
         });
}


const FindBookBySub = async function (req,res) {
    const sub = req.params.sub;
    db.sequelize.query(
        'CALL Bookbysubject(?)',
        {
            replacements: [sub],
            type: db.Sequelize.QueryTypes.SELECT
        }
    ).spread(books => {
        console.log(books)
        //const bookArray = Object.keys(books).map(book=>books(book));
        
        const Books = Object.values(books);
        console.log(Object.values(books))
        
      
        return res.status(200).json(Books);

    }).catch(function(err) {
        console.log("erroooorr")
        return  res.status(422).json({error:err});
         });
}

const  BooksOfUser =async function(req,res) {
    const username = req.params.userid;
    //console.log(username);
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
    //  console.log(req.body)
    //  console.log(req)
     const bookid = req.params.bookId;
     const username = req.user.username;
   // console.log("bookid: ",bookid)
     let isbook;
    await db.sequelize.query(
       'select UserUsername from book_belongs_to where bookId=?',
       {
           replacements: [bookid],
           type: QueryTypes.SELECT
       }
       )
       .then(user=>
       {
        // console.log(user[0].UserUsername===username)

         //return userName===username
        // console.log(isBook)
           return res.status(200).send(user[0].UserUsername===username);
       })
       .catch(function(err) {
         console.log(err)
         return  res.status(422).json({error:err});
          });
}
const sentMail = async function (req,res) {
const nodemailer = require('nodemailer');
const name=req.user.Fname+req.user.Lname
const bookid=req.params.bookid
await db.sequelize.query(
   'select * from Users where username IN (select UserUsername from book_belongs_to where bookId=?)',
   {
       replacements: [bookid],
       type: QueryTypes.SELECT
   }
   )
   .then(user=>
   {
     var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'tempt088@gmail.com',
         pass: 'ABcd@123'
       }
     });

     var mailOptions = {
       from: 'himasajeev0801@gmail.com',
       to: user.email,
       subject: 'You have a customer',
       text: 'Hey \n '+name +'wants to buy your book with bookid'+bookid+'. Please do contact him at '+req.user.mailid+'\n Thank you from book exchange team'
     };

     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
         return res.status(200).send('failed to send mail');
       } else {
         console.log('Email sent: ' + info.response);
         return res.status(200).send('success');

       }
     });
}).catch(function(err)=>{
  console.log(err)
return  res.status(422).json({error:err});
})

}

      

export default {FindBookByAuthor, isBookofUser,FindBookByName, FindBookBySub, BooksOfUser,isOwner,bookById,read,list,addBook,update,Delete,ownerInfo,sentMail}
