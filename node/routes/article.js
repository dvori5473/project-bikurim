const express=require("express")
const router=express.Router()
const articleController=require("../controller/articleController")

router.get("/",articleController.getAllArticle)
router.post("/",articleController.creataNewArticle)
router.put("/",articleController.updateArticle)
router.delete("/",articleController.deletArticle)


module.exports=router