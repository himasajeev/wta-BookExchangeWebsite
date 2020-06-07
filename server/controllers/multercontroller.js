const db = require("../models");
import multer from "multer"
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
  }).single('image');
  const Upload =(req,res)=>{
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if(!err)
           return res.send(200).json({file:req.file});
     })
    
  }
  

export default {Upload};