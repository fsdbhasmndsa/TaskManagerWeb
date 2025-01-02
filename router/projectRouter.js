const express = require('express')
const router = express.Router();
const ProjectController =  require("../controller/projectController")

router.get("/",ProjectController.GetProjectByID)
router.post("/Create",ProjectController.CreateProject)


module.exports =router