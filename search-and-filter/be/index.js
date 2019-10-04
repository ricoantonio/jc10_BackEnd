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
    let sql=`select * from data`
    let {query}=req
    if(query){
        sql+=` where`
        //nama,ageMin,ageMax,gender,pclass,status
        if(query.name){
            sql+=` name like '%${query.name}%' and`
        }
        if(query.agemin&&query.agemax){
            sql+=` age<=${query.agemax} and age >= ${query.agemin} and`
        }
        if(query.gender){
            sql+=` sex = '${req.query.gender}' and`
        }
        if(query.pclass){
            sql+=` pclass = ${req.query.pclass} and`
        }
        if(query.survived<2){
            sql+=` survived = ${query.survived} and`
        }
    }

    db.query(sql.slice(0,-4),(err,result)=>{
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(error);
        }
        
    })
})



app.get('/getpclass',(req,res)=>{
    db.query(`select pclass from data group by pclass`,(err,result)=>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            console.log(error);
            
        }
    })
})

app.listen(port,console.log('Listening in port '+ port))