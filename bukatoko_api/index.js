var express=require('express')
var app=express()

var cors=require('cors')
var bodyParser=require('body-parser')


const port =7000
const {authRouter}=require('./2.routers')

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hehe')
})

app.use('/auth',authRouter)

app.listen(port,console.log('Server yeyeyeye'))