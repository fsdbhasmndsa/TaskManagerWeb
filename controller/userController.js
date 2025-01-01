const User = require("../models/user.model")
const GenerateToken = require("../helper/GenerateToken")
const GenerateOTP = require("../helper/GenerateOTP")
const nodemailer = require('nodemailer');

module.exports.Register = async (req, res) => {

    const email = req.body.Email;

    const userExist = await User.findOne({ Email: email })

    if (userExist != null) {
        res.json({ code: 400, message: "Email has already exist" })
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

    res.json({ code: 200, token: Token })
}

module.exports.FindAll = async (req, res) => {
    const ListUser = await User.find({ Deleted: false })

    res.json({ code: 200, ListUser: ListUser, message: "Get User Successfull" })

}

module.exports.GetDetailUser = async (req, res) => {
    const id = req.params.id;

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

        res.json({code:200,message:"Send OTP Successful",OTP:OTP})
}

module.exports.ResetPassword = async (req, res) =>{

}