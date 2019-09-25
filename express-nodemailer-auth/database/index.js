var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = 1337
const nodemailer=require('nodemailer')
const mysql=require('mysql')

const db = mysql.createConnection({
    user:'root',
    password:'password',
    database:'authentication_test',
    host:'localhost'
})

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Nodemailer Auth API</h1>')
})

let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'testmailpurwadhika@gmail.com',
        pass: 'jcwwoezebsgvhwfe'
    }
})

app.get('/sendmail',(req,res)=>{
    let to = req.query.email
    let mailOption = {
        from: 'Purwadhika JC 10 <testmailpurwadhika@gmail.com>',
        to,
        subject: 'Testing Nodemailer',
        html: '<h1>Berhasil Berhasil Berhasil Hore</h1>'
    }

    if(to){
        transporter.sendMail(mailOption,(err,info)=>{
            if (err) throw err
            res.send('Email berhasil!')
        })
    } else{
        res.send('Email kosong!')
    }
})

app.get('/sendverifyemail',(req,res)=>{
    let to=req.query.email
    let username=req.query.username
    let mailOption={
        from: 'Nodemailerku',
        to,
        subject:'Verify your account!',
        html:`<p> Klik <a href='http://localhost:1337/verify?username=${username}'>link</a> ini untuk verifikasi email anda</p>`
    }
    if(to){
        transporter.sendMail(mailOption,(err,info)=>{
            if (err) throw err
            res.send('Email berhasil!')
        })
    } else{
        res.send('Email kosong!')
    }
})

app.get('/verify',(req,res)=>{
    let username=req.query.username
    let sql= `update users set verified = 1 where username='${username}'`
    
    db.query(sql,(err,result)=>{
        if (err) throw err
        res.send('Akun anda berhasil diverifikasi')
    })
})

app.listen(port,console.log('Listening in port '+ port))