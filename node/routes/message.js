const express=require("express")
const router=express.Router()
const messageController=require("../controller/messageController")

router.get("/",messageController.getAllMessage)
router.post("/",messageController.creataNewMessage)
router.delete("/",messageController.deletMessage)


module.exports=router