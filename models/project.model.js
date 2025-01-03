const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    Name: String,
    CreateBy:String,
    Content:String,
    // ListUser:Array,
    Deleted: {
        type: Boolean,
        default: false
    }

},
{
    timestamps:true
}




);

const Project = mongoose.model("Project",ProjectSchema, "Projects")


module.exports = Project


