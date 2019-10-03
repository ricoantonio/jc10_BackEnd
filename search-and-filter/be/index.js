var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = 8080
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
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(error);
        }
        
    })
})


app.listen(port,console.log('Listening in port '+ port))