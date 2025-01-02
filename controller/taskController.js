const { model } = require("mongoose");
const Tasks = require("../models/task.model")
const User = require("../models/user.model")
const regex = require("../helper/SearchHelper")


module.exports.GetALLTask = async (req, res) => {
    try {
        const find = { Deleted: false };
        const ListTask = await Tasks.find(find);  // Get tasks from DB
        res.json(ListTask);  // Return tasks as JSON
    } catch (err) {
        res.status(500).json({ message: err.message });  // Return error if any
    }

}

module.exports.GetDetailTask = async (req, res) => {
    const id = req.params.id;

    const Task = await Tasks.findOne({ _id: id })
    res.json({
        code: 200,
        task: Task
    })
}

module.exports.ChangeStatus = async (req, res) => {
    const { id, status } = req.body

    await Tasks.updateOne({ _id: id }, { Status: status })

    res.json({
        code: 200,
        message: "Change status Successful"
    })
}

module.exports.DeleteTask = async (req, res) => {
    const id = req.params.id;

    await Tasks.updateOne({ _id: id }, { Deleted: true })

    res.json({ code: 200, message: "Delete Task SuccessFul" })
}

module.exports.CreateTask = async (req, res) => {
    req.body.CreateBy = req.user._id
    const task = new Tasks(req.body)

    await task.save();

    res.json({ code: 200, task: task })

}

module.exports.UpdateTask = async (req, res) => {
    const id = req.params.id;

    await Tasks.updateOne({ _id: id }, req.body)

    res.json({ code: 200 })

}

module.exports.FindTaskByUser = async (req, res) => {
    const Token = req.user.Token;

    const id = await User.findOne({ Token: Token }).select("_id")
    const stringId = id._id.toString();
    const find = {
        Deleted: false,
        _id:id
    }

    const ListTaskByUser = await Tasks.find(find)

    res.json({ code: 200, ListTask: ListTaskByUser })
}

module.exports.FindTaskByUserDeleted = async (req, res) => {
    const Token = req.user.Token;

    const id = await User.findOne({ Token: Token }).select("_id")
    const stringId = id._id.toString();
    const find = {
        Deleted: true,
        _id:id
    }

    const ListTaskByUser = await Tasks.find(find)

    res.json({ code: 200, ListTask: ListTaskByUser })
}

module.exports.GetMemberTheSameTask = async (req, res) => {
        
}

module.exports.GetMemberNotInTask = async (req, res) => {
 
  
}

module.exports.AddMember = async (req, res) => {

}

module.exports.MinusMember = async (req, res) => {

}
