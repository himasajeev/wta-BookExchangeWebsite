const db = require("../models");
import multer from "multer"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "client/public/images/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
  })
  
  var upload = multer({ storage: storage}).single('file');
  const Upload =(req,res,next)=>{
  
    upload(req, res, function (err) {
      console.log("inside upload")
      if (err instanceof multer.MulterError) {
        console.log(err)
          return res.status(500).json(err)
      } else if (err) {
        console.log(err)
          return res.status(500).json(err)
      }
      console.log(req.file)

      next();
    
  })
}
  

export default {Upload};


// fileFilter: (req, file, cb) => {
//   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//     cb(null, true);
//   } else {
//     req.fileValidationError = 'Only .png, .jpg and .jpeg format allowed!';
//     return cb(null, false,new Error('Only .png, .jpg and .jpeg format allowed!'));

//   }
// }
//}