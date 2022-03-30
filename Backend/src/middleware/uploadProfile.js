const multer=require("multer");
 
const path=require("path")
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname,"../Uploadeditems"))
    },
    filename: function (req, file, callback) {
      const uniquePreffix= Date.now()  
      callback(null,  uniquePreffix + '-' + file.originalname)
    }
  })
  function fileFilter (req, file, callback) {

     if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
      
    callback(null, true)
   
     }
     else{
      callback(null, false)
     }
  }
const options={
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        filesize:1024*1024*20
    }
}

const uploads=multer(options)

const single=(key)=>{
    
  return function (req,res, next){
    const uplodedItem=uploads.single(key);
    return uplodedItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(501).send({messagemulter:err.message})
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(501).send({messagenoramal:err.message})
      }
      return next();
   })
  }
}
 

module.exports=single