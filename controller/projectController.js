const Project =  require("../models/project.model")
const User= require("../models/user.model")



module.exports.CreateProject = async (req,res) =>{

    const token = req.user.Token;
    const nameProject = req.body.Name
    const id = await User.findOne({Token:token,Deleted:false})


    const project = new Project({
        Name:nameProject,
        CreateBy:id._id.toString()
    })

    await project.save()

   res.json({code:200,message:"Create Successful"})
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
