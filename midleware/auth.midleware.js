const User =  require("../models/user.model")


module.exports.requireAuth = async(req,res,next)=>{
  
    const token = req.headers.authorization?.split(" ")[1] || null

    if(token != null)
    {
    const user = await User.findOne({Token:token})
   
    if(user == null)
    {
        res.json({code:400,messsage:"Please give sever token"})
        return;
    }
    else{
       req.user = user
        next()
    }
  
    }
    else{
        res.json({code:400,messsage:"Please give sever token"})
    }
}