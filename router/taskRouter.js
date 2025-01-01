const express = require('express')
const ControllerTask = require("../controller/taskController")
const router = express.Router();

// example Findall
router.get("/",ControllerTask.GetALLTask)

// Detail Task
router.get("/Detail/:id",ControllerTask.GetDetailTask)

// Change status task
router.patch("/ChangeStatus",ControllerTask.ChangeStatus)

// Delete task
router.patch("/DeleteTask/:id",ControllerTask.DeleteTask)

// Create task
router.post("/Create",ControllerTask.CreateTask)

// Update task
router.put("/Update/:id",ControllerTask.UpdateTask)

// findbyIDuser
router.get("/GETtaskByID",ControllerTask.FindTaskByUser)

module.exports = router;