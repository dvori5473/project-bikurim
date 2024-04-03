const express=require("express")
const router=express.Router()
const articalController=require("../controller/articalControler")

router.get("/",articalController.getAllArticals)
router.get("/:id",articalController.getArticalById)
router.post("/",articalController.creatNewArtical)
router.delete("/",articalController.deleteArtical)
router.put("/",articalController.updateArtical)

module.exports=router