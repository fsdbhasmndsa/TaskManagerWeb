const express = require('express')
const router = express.Router();
const ProjectController =  require("../controller/projectController")

router.get("/",ProjectController.GetProjectByID)
router.post("/Create",ProjectController.CreateProject)
router.put("/Update",ProjectController.UpdateProject)
router.put("/Delete",ProjectController.DeletedProject)


module.exports =router


// {
  
//     "Title": "Task 152",
//     "Status": "not finish",
//     "Content": "Task 152's content",
//     "TimeStart": "2024-12-30T12:00:00Z",
//     "TimeFinish": "2024-12-30T12:00:00Z",
//      "ListUser": ["6774183b628d92e75e01cf55","6774c1f0925f3aa809c03091"]
//   }