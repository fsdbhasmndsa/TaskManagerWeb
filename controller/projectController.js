const Project =  require("../models/project.model")

module.exports.CreateProject = async (req,res) =>{



}

module.exports.GetProjectByID = async (req,res) =>{

    const id =  req.user._id;
    const idString = id.toString();

    const ListProject = await Project.find({CreateBy:idString,Deleted:false})



    res.json({code:200,ListProject:ListProject,message:"Get Successful"})

    
}