const express = require('express')
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")
const projectRouter =  require("./projectRouter")
const requireAuth = require("../midleware/auth.midleware")

const router = (app) =>{
    app.use("/task",requireAuth.requireAuth,taskRouter)
    app.use("/user",userRouter)
    app.use("/project",requireAuth.requireAuth,projectRouter)
}


module.exports = router