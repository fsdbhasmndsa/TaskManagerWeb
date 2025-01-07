const User = require("../models/user.model")

const GenerateToken = require("../helper/GenerateToken")
const GenerateOTP = require("../helper/GenerateOTP")
const SendMail= require("../helper/MailHelper")
const Otp = require("../models/otp.model")
const contentHTML =  require("../helper/contentEmail")
const htmlContentOTP =  require("../helper/contentEmailOTP")
const Project  =  require("../models/project.model")
module.exports.Register = async (req, res) => {

    const email = req.body.Email;

    const userExist = await User.findOne({ Email: email })
    console.log("userExist",userExist)
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
    const projectTotal = await Project.countDocuments({CreateBy:id,Deleted:false})
    res.json({ code: 200, UserDetail: userDetail,ProjectTotal:projectTotal})
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
    const {Email,CurrentPassword,NewPassword} =  req.body;
    const UserLogin = await User.findOne({Email:Email,Password:CurrentPassword})
    if(UserLogin == null)
    {
        res.json({code:400,message:"Email or Password Wrong"})
        return;
    }
    else{
        console.log("first",NewPassword)
        console.log("first",UserLogin.Password)
        if(NewPassword != UserLogin.Password)
        {
            console.log("first",UserLogin)
            await User.updateOne({_id:UserLogin._id},{Password:NewPassword})
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
            res.json({code:400,message:"Email không tồn tại"})
            return;
        }
        const OTP =GenerateOTP(6);
        const otpSave = new Otp({
            UserID:userNeedtoGet._id.toString(),
            OTP:OTP
        })
      await  otpSave.save()
      SendMail(Email,OTP,htmlContentOTP(OTP))
        
        res.json({code:200,message:"Gửi OTP thành công"})
}


module.exports.ResetPassword = async (req, res) =>{
    const {Email,NewPassword} =  req.body
    console.log("Email",Email)
    console.log("NewPassword",NewPassword)
    //
    try {
        const user = await User.findOne({Email:Email})
   
     await User.updateOne({Email:Email},{Password:NewPassword})
    res.json({code:200,message:"Quên mật khẩu thành công"})
    } catch (error) {
    res.json({code:400,message:"Quên mật khẩu không thành công"})
    }

}

module.exports.GETNAMEUSER = async (req, res) =>{
    const token = req.user.Token
 const name = await User.findOne({Token:token}).select("Fullname")
console.log("first",name)
 res.json({code:200,Name:name.Fullname,message:"Lấy Fullname thành công"})
}


