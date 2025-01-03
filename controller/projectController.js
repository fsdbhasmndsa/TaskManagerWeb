const Project =  require("../models/project.model")
const User= require("../models/user.model")



module.exports.CreateProject = async (req,res) =>{

   try {
    const token = req.user.Token;
    console.log("first",token)
    const nameProject = req.body.Name
    const Content = req.body.Content
    const id = await User.findOne({Token:token,Deleted:false})


    const project = new Project({
        Name:nameProject,
        CreateBy:id._id.toString(),
        Content:Content
    })

    await project.save()

   res.json({code:200,message:"Tạo dự án thành công"})
   } catch (error) {
    res.json({code:400,message:"Tạo dự án thất bại"})
   }
}

module.exports.UpdateProject = async (req,res) =>{

    try {
     const token = req.user.Token;
     console.log("first",token)
     const ID = req.body.ID
     const nameProject = req.body.Name
     const Content = req.body.Content
     const id = await User.findOne({Token:token,Deleted:false})
     req.body.CreateBy = id._id.toString()
 
     await Project.updateOne({_id:ID},req.body)
 
    res.json({code:200,message:"Cập nhật dự án thành công"})
    } catch (error) {
     res.json({code:400,message:"Cập nhật dự án thất bại"})
    }
 }

module.exports.GetProjectByID = async (req,res) =>{

    const id =  req.user._id;
    const idString = id.toString();

    const ListProject = await Project.find({CreateBy:idString,Deleted:false})



    res.json({code:200,ListProject:ListProject,message:"Get Successful"})

    
}

module.exports.DeletedProject = async (req,res) =>
{
    const id  = req.body.ID
   await Project.updateOne({_id:id},{Deleted:true})

   res.json({code:200,message:"Delete Successful"})
}
