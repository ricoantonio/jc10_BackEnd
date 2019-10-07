//npm i express body-parser cors mysqljs/mysql jsonwebtoken

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors=require('cors')
const port=7070
const db=require("./database/index")

app.use(bodyParser.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to my first API!</h1>`)
})


app.listen(port,()=>console.log(`Listening from ${port}`))