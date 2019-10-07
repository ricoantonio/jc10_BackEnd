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

const auth= (req,res,next)=>{
    // buat cek kalo user boleh akses api ato nga
    if(req.method !== "OPTIONS" ){
        //let success = true
        console.log(req.headers.authorization);
        /**
         * jwt,verify
         * param 1= token
         * param 2= appKey (HARUDS SAMA, GAK BOLEH HILANG)
         * param 3= cb fn (err, hasil decrypt)
         * 
         */

        jwt.verify(req.headers.authorization, appKey, (error,decoded)=>{
            if(error){
                //success = false
                return res.status(401).json({message:'User not authorized.',error:'User not authorized'})
            }
            console.log({decoded});
            req.user =decoded
            next()
            // lanjut ke fn berikutnya 
        })
    }else{
        next()
    }
}

app.get(
    '/verifytoken',
    (req,res,next)=>{
        if(req.method !== "OPTIONS" ){
            //let success = true
            console.log(req.headers.authorization);
            jwt.verify(req.headers.authorization, appKey, (error,decoded)=>{
                if(error){
                    //success = false
                    return res.status(401).json({message:'User not authorized.',error:'User not authorized'})
                }
                console.log({decoded});
                req.user =decoded
                next()
            })
        }else{
            next()
        }
    },
    (req,res)=>{
        res.send('User authorized')
})

app.post('/gettoken', (req,res)=>{
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