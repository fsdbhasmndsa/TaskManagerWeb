const express = require('express')
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")

const router = (app) =>{
    app.use("/task",taskRouter)
    app.use("/user",userRouter)
}


module.exports = router