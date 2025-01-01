const express = require('express')
const database = require("./config/Database")
const bodyParser = require('body-parser')

const app = express()
const Router = require("./router/indexRouter")
const port = 8080
database.connect();





app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

Router(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})