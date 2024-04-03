const express=require("express")
const router=express.Router()
const UserControler=require("../controller/userControler")
const veryfyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")

//router.post("/",UserControler.creataNewUser)
//router.delete("/",UserControler.deletUser)
//router.get("/id",UserControler.getUserbyId)
router.use(veryfyJWT)
router.put("/",UserControler.updateUser)
router.put("/addProduct",UserControler.addProduct)
router.put("/deletProduct",UserControler.deletProduct)
router.put("/updateProductQuantity",UserControler.updateProductQuantity)
router.put("/addDefaultAddress",UserControler.addDefaultAddress)
router.put("/cleaningBasket",UserControler.cleaningBasket)
router.put("/updateBasket",UserControler.updateBasket)

router.use(verifyAdmin)
router.get("/",UserControler.getAllUsers)

 

module.exports=router 