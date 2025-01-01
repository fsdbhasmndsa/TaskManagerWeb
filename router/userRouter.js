const express = require('express')
const router = express.Router();
const usercontroller = require("../controller/userController")

router.post("/register",usercontroller.Register)
router.get("/findall",usercontroller.FindAll)
router.get("/Detail/:id",usercontroller.GetDetailUser)
router.post("/login",usercontroller.Login)
router.post("/changepassword",usercontroller.ChangePassword)
router.post("/forgotpassword",usercontroller.ForgotPassword)

module.exports = router