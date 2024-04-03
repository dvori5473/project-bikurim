const express=require("express")
const router=express.Router()
const orderController=require("../controller/orderController")
const veryfyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")

router.use(veryfyJWT)

router.get("/:id",orderController.getOrderbyId)
router.post("/",orderController.creataNewOrder)

router.use(verifyAdmin)
router.put("/",orderController.updateOrder)
router.get("/",orderController.getAllOrders)
//router.delete("/",orderController.deletOrder)


module.exports=router