var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = 6060
const mysql=require('mysql')

const db = mysql.createConnection({
    user:'root',
    password:'password',
    database:'titanic_jc10',
    host:'localhost'
})

app.use(bodyParser.json())
app.use(cors())

app.get('/getdata',(req,res)=>{
    db.query(`select * from data`,(err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})


app.listen(port,console.log('Listening in port '+ port))