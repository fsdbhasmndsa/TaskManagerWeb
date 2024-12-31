const express = require('express')
const database = require("./config/Database")
const Task = require("./config/task.model")
const app = express()
const port = 3000
database.connect();



app.get('/', async(req, res) => {

    const ListTask = await Task.find({Deleted:false});
   
     res.json(ListTask);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})