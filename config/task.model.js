const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    Title: String,
    Status: String,
    Content: String,
    TimeStart: Date,
    TimeFinish: Date,
    Deleted: {
        type: Boolean,
        default: false
    }

},
{
    timestamps:true
}



);

const Task = mongoose.model("Task",TaskSchema, "Tasks")


module.exports = Task