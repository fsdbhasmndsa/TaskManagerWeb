const express = require('express')
const router = express.Router();
const usercontroller = require("../controller/userController")
const requireAuth = require("../midleware/auth.midleware")

router.post("/register",usercontroller.Register)
router.get("/findall",requireAuth.requireAuth,usercontroller.FindAll)
router.get("/Detail",requireAuth.requireAuth,usercontroller.GetDetailUser)
router.post("/login",usercontroller.Login)
router.post("/changepassword",usercontroller.ChangePassword)
router.post("/forgotpassword",usercontroller.ForgotPassword)
router.get("/getnameuser",requireAuth.requireAuth,usercontroller.GETNAMEUSER)
router.post("/ResetPassword",usercontroller.ResetPassword)
router.post("/LoginWithGoogle",usercontroller.LoginWithGoogle)

module.exports = router