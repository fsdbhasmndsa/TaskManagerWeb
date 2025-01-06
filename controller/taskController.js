const { model } = require("mongoose");
const Tasks = require("../models/task.model")
const User = require("../models/user.model")
const Project = require("../models/project.model")
const regex = require("../helper/SearchHelper")


module.exports.GetALLTask = async (req, res) => {
    try {

        const find = { Deleted: false, CreateBy: req.user._id.toString() };

        const init = await Tasks.find(find).countDocuments({ Status: "init" });  // Get tasks from DB
        const doing = await Tasks.find(find).countDocuments({ Status: "doing" });
        const finish = await Tasks.find(find).countDocuments({ Status: "finish" });
        const notfinish = await Tasks.find(find).countDocuments({ Status: "not finish" });
        res.json({ message: "Lấy thành công", init: init, doing: doing, finish: finish, notfinish: notfinish });  // Return tasks as JSON
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
    try {
        const id = req.params.id;

        await Tasks.updateOne({ _id: id }, { Deleted: true })

        res.json({ code: 200, message: "Xóa thành công" })
    } catch (error) {
        res.json({ code: 400, message: "Xóa không thành công" })
    }
}

module.exports.CreateTask = async (req, res) => {
    req.body.CreateBy = req.user._id
    const task = new Tasks(req.body)

    await task.save();

    res.json({ code: 200, task: task, message: "thêm thành công" })

}

module.exports.UpdateTask = async (req, res) => {
    const id = req.params.id;

    await Tasks.updateOne({ _id: id }, req.body)

    res.json({ code: 200, message: "cập nhật thành công" })

}

module.exports.FindTaskByUser = async (req, res) => {
    const Token = req.user.Token;
    const IDProject = req.params.IDProject

    const id = await User.findOne({ Token: Token }).select("_id")
    const stringId = id._id.toString();

    console.log("first", stringId)
    console.log("first", IDProject)

    const find = {
        Deleted: false,
        CreateBy: stringId,
        BelongProject: IDProject
    }

    const ListTaskByUser = await Tasks.find(find)

    res.json({ code: 200, ListTask: ListTaskByUser, id: stringId })
}

module.exports.FindTaskByUserDeleted = async (req, res) => {
    const Token = req.user.Token;

    const id = await User.findOne({ Token: Token }).select("_id")
    const stringId = id._id.toString();
    const find = {
        Deleted: true,
        _id: id
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

module.exports.ChangeStatusAuto = async (req, res) => {
    const Token = req.user.Token
    console.log("first", Token)
    const user = await User.findOne({ Token: Token, Deleted: false })
    // const  id = user._id.toString();

    const datenow = new Date();
    console.log("Original Date:", datenow);
    
    // // Lấy ngày, tháng, năm theo UTC
    // const day = datenow.getUTCDate(); // Lấy ngày theo UTC
    // console.log("Day (UTC):", day);
    
    // const month = datenow.getUTCMonth(); // Lấy tháng theo UTC (0-11)
    // console.log("Month (UTC):", month + 1); // Thêm 1 để đúng tháng (1-12)
    
    // const year = datenow.getUTCFullYear(); // Lấy năm theo UTC
    // console.log("Year (UTC):", year);
    
    // Đặt giờ thành 0 theo UTC
    datenow.setUTCHours(0, 0, 0, 0);
    // console.log("Date after setting hours to 0 (UTC):", datenow);

    const ListTask = await Tasks.updateMany({ TimeFinish: datenow},{Status:"not finish"});
    // console.log("List", ListTask)
    

    res.json({ code: 200, Token: Token })
}