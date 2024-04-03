const express=require("express")
const router=express.Router()
const taskController=require("../controller/taskControler")

router.get("/",taskController.getAllTasks)
router.get("/:id",taskController.getTaskById)
router.post("/",taskController.creatNewTask)
router.delete("/",taskController.deleteTask)
router.put("/",taskController.updateTask)
router.put("/complete/:id",taskController.updateTaskComplete)
router.put("/addStep",taskController.addStep)

module.exports=router