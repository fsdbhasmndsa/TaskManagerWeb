const express = require('express')
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")
const projectRouter =  require("./projectRouter")
const requireAuth = require("../midleware/auth.midleware")
const otpRouter = require("../router/otpRouter")
const router = (app) =>{
    app.use("/task",requireAuth.requireAuth,taskRouter)
    app.use("/user",userRouter)
    app.use("/project",requireAuth.requireAuth,projectRouter)
    app.use("/otp",otpRouter)
}


module.exports = router