const express=require("express")
const router=express.Router()
const recommendationController=require("../controller/recommendationController")

router.get("/",recommendationController.getAllRecommendation)
router.post("/",recommendationController.creataNewRecommendation)
router.delete("/",recommendationController.deletRecommendation)



module.exports=router