const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    Title: String,
    Status: String,
    Content: String,
    TimeStart: Date,
    TimeFinish: Date,
    CreateBy:String,
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

const Task = mongoose.model("Task",TaskSchema, "Tasks")


module.exports = Task


// {
  
//     "Title": "Task 15",
//     "Status": "not finish",
//     "Content": "Task 15's content",
//     "TimeStart": "2024-12-30T12:00:00Z",
//     "TimeFinish": "2024-12-30T12:00:00Z",
//      "ListUser": ["6774183b628d92e75e01cf55","6774c1f0925f3aa809c03091"]
//   }