const express = require('express')
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")
const requireAuth = require("../midleware/auth.midleware")

const router = (app) =>{
    app.use("/task",requireAuth.requireAuth,taskRouter)
    app.use("/user",userRouter)
}


module.exports = router