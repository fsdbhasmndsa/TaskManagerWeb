const User = require("../models/user.model")

const GenerateToken = require("../helper/GenerateToken")
const GenerateOTP = require("../helper/GenerateOTP")
const SendMail= require("../helper/MailHelper")
const Otp = require("../models/otp.model")
const contentHTML =  require("../helper/contentEmail")
module.exports.Register = async (req, res) => {

    const email = req.body.Email;

    const userExist = await User.findOne({ Email: email })

    if (userExist != null) {
        res.json({ code: 400, message: "Email đã tồn tại" })
        return;
    }

    const Token = GenerateToken(8);

    const user = new User({
        Email: req.body.Email,
        Password: req.body.Password,
        Fullname: req.body.Fullname,
        Token: Token
    })

    await user.save();
    SendMail(email,email,contentHTML)

    res.json({ code: 200, token: Token,message:"Đăng kí thành công" })
}

module.exports.FindAll = async (req, res) => {
    const ListUser = await User.find({ Deleted: false }).select("Fullname Email")

    res.json({ code: 200, ListUser: ListUser, message: "Get User Successfull" })

}

module.exports.GetDetailUser = async (req, res) => {
    const id = req.user.id;

    const userDetail = await User.findOne({ _id: id }).select("-Password");

    res.json({ code: 200, UserDetail: userDetail })
}

module.exports.Login = async (req, res) =>{

    const {Email,Password} =  req.body;
 
    const UserLogin = await User.findOne({Email:Email,Password:Password})
    if(UserLogin == null)
    {
        res.json({code:400,message:"Login Failed"})
        return;
    }

    
    res.json({code:200,Token:UserLogin.Token,message:"Login SuccessFul"})
}


module.exports.ChangePassword = async (req, res) =>
{
    const {Email,Password,NewPassWord} =  req.body;
    const UserLogin = await User.findOne({Email:Email,Password:Password})
    if(UserLogin == null)
    {
        res.json({code:400,message:"Email or Password Wrong"})
        return;
    }
    else{
        console.log("first",NewPassWord)
        console.log("first",UserLogin.Password)
        if(NewPassWord != UserLogin.Password)
        {
            console.log("first",UserLogin)
            res.json({code:200,message:"Change Password  Successful"})
        }
        else{
            res.json({code:400,message:"NewPassWord and PassWord are the same"})
        }

       
    }
}

module.exports.ForgotPassword = async (req, res) =>
{
        const Email = req.body.Email;

        const userNeedtoGet =  await User.findOne({Email:Email})

        if(userNeedtoGet == null)
        {
            res.json({code:400,message:"Email does not exist"})
            return;
        }
        const OTP =GenerateOTP(6);
        const otpSave = new Otp({
            UserID:userNeedtoGet._id.toString(),
            OTP:OTP
        })
      await  otpSave.save()
      SendMail(Email,OTP,`<h1  >Welcome Your OTP is </h1><p style="color:blue;"> ${OTP} </p>`)
        
        res.json({code:200,message:"Send OTP Successful",OTP:OTP})
}

module.exports.CheckOTP = async (req, res) =>{



}

module.exports.ResetPassword = async (req, res) =>{

}