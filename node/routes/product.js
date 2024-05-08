const express=require("express")
const productController=require("../controller/productController")
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")
const router=express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, './public/uploads')
    },
    filename : function(req, res, cb){
        const uniqeSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null, uniqeSuffix +".jpg")
    }
})
const upload = multer({storage:storage})



router.get("/",productController.getAllProduct)
router.get("/:id",productController.getProductbyId)
router.use(verifyJWT)
router.use(verifyAdmin)
router.post("/", upload.array('imageURL'),productController.creataNewProduct)
router.put("/",upload.array('imageURL'),productController.updateProduct)
router.delete("/",productController.deletProduct)

 
module.exports=router 