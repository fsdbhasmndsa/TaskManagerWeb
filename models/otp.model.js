const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    UserID: String,
    OTP: String
},
{
    timestamps:true
}



);

const Otp = mongoose.model("Otp",OtpSchema, "Otps")


module.exports = Otp