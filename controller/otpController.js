const OTPMODEL  = require("../models/otp.model")
const User =  require("../models/user.model")

module.exports.CompareOTP = async (req,res) =>{

    const {Email,OTP} = req.body;
    console.log("Emai",Email)
    console.log("OTP",OTP)
    const id = await User.findOne({Email:Email}).select("_id")
    console.log("OTP",id._id.toString())
    const otp = await OTPMODEL.findOne({UserID:id._id.toString(),OTP:OTP})
    console.log("first",otp)
    if(otp !=null)
    {
        await OTPMODEL.deleteOne({_id:otp._id})
        res.json({code:200,message:"OTP đúng"})
    }
    else{
        res.json({code:400,message:"OTP không đúng"})
    }
    

}