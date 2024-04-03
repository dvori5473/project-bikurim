const express=require("express")
const router=express.Router()
const commonQuestionController=require("../controller/commonQuestionController")

router.get("/",commonQuestionController.getAllCommonQuestion)
router.post("/",commonQuestionController.creataNewCommonQuestion)
router.put("/",commonQuestionController.updateCommonQuestion)
router.delete("/",commonQuestionController.deletCommonQuestion)


module.exports=router