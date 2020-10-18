var multer      = require('multer');  
var storage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
        cb(null,'./public/uploads');  
    },  
    filename:(req,file,cb)=>{  
        cb(null,file.originalname);  
    }  
});  
  
var uploads = multer({storage:storage});  
  
module.exports = {
    uploads:uploads
  };