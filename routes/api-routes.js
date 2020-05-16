var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
var ejs = require("ejs");
var multer  = require('multer')
var bodyParser = require("body-parser");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage,

  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      req.fileValidationError = 'Only .png, .jpg and .jpeg format allowed!';
      return cb(null, false,new Error('Only .png, .jpg and .jpeg format allowed!'));

    }
  }
});

module.exports = function(app) {
  app.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/',failureFlash:true })(req, res));

  app.post("/signup", function(req, res) {
      console.log(req.body);
      db.User.create({
        username:req.body.username,
        Fname:req.body.fn,
        Lname:req.body.ln,
        email: req.body.mailid,
        password: req.body.password
      }).then(function() {
        console.log("created");
      //  res.send("created");
      passport.authenticate("local")(req,res,function(){
     console.log("k?");
     res.redirect("/profile");
   });
      //res.redirect(307,"/login");
      }).catch(function(err) {
        console.log(err.errors);

          res.render("signup.ejs",{message:err.errors[0].message})
        });
      //  res.json(err);
        // res.status(422).json(err.errors[0].message);

    });


//var fields = upload.fields([{name:'image'},{name:'title'}]);
    app.post("/addbook", upload.single('image'),function(req, res,next) {
         if(req.fileValidationError) {
              return res.render("addbook.ejs",{message:req.fileValidationError});
            }

       const file = req.file;
        console.log(req.body);
        console.log(req.file);
        if(!file)
        {
          res.render("addbook.ejs",{message:"Plese upload an image file!"})
        }else{
          console.log(req.body);
          db.book.create({
            bookname:req.body.title,
            author:req.body.author,
            price:req.body.price,
            owner: req.user.username,
            imagepath:'public/images/uploads'+file.filename
          }).then(function() {
            console.log("book created");

            res.render("addbook.ejs",{message:"book added succesfully"})
          }).catch(function(err) {
            //console.log(err.errors);

              res.render("addbook.ejs",{message:err.message})
            });
        }



      });



    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });


  };
