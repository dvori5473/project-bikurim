const express=require("express")
const router=express.Router()
const UserHMControler=require("../controller/userHMControler")

router.get("/",UserHMControler.getAllUsersHM)
router.post("/",UserHMControler.creataNewUserHM)
router.put("/",UserHMControler.updateUserHM)
router.delete("/",UserHMControler.deletUserHM)
router.get("/id",UserHMControler.getUserHMbyId)


module.exports=router