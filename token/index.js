//npm i express body-parser cors mysqljs/mysql jsonwebtoken

var jwt =  require('jsonwebtoken')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors=require('cors')
const port=8080
const db=require("./database/index")
const appKey = 'secretkey'

app.use(bodyParser.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to my first API!</h1>`)
})

app.get('verifytoken',(req,res)=>{

})

app.post('/gettoken',(req,res)=>{
    let {username,email}=req.body
    let token = jwt.sign({username, email}, appKey, {expiresIn:'12h'})
    console.log(token)

    res.send({
        username,
        email,
        token
    })
    
})

app.listen(port,()=>console.log(`Listening from ${port}`))