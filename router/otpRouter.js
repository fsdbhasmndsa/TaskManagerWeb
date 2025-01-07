const express = require('express')
const router = express.Router();

const OTPContrller = require("../controller/otpController")

router.post("/compareOTP",OTPContrller.CompareOTP)


module.exports = router