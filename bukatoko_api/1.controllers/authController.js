const db =require('../database')
var nodemailer=require('nodemailer')
var {pdfcreate} = require('../3.helpers/html-pdf')
const fs=require('fs')

let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'testmailpurwadhika@gmail.com',
        pass: 'jcwwoezebsgvhwfe'
    }
})

module.exports={
    login:(req,res)=>{
        db.query(`select * from users where username = '${req.query.username}'`, 
            (err,result)=>{
                if (err) throw err
                if (result.length>0){
                    if (req.query.password===result[0].password){
                        res.send({
                            status:'200',
                            result:result[0]
                            // result masih array of object 
                            // kalo result: result[0] berupa object
                        })
                    }else{
                        res.send({
                            status:'401',
                            message:'Wrong Password'
                        })
                    }
                }else{
                    let hasil={
                        status:'404',
                        message:'User not found'
                    }
                    res.send(hasil)
                }
        })
    },
    register:(req,res)=>{
        let sql= `select * from users where username='${req.body.username}' or email=${req.body.email}`
        let sql2=`insert into users value (0, '${req.body.username}', '${req.body.password}','${req.body.email}', 'free' ,0)`
        
        db.query(sql,(err,result)=>{
            if (err) throw err
            if (result.length>0){
                res.send({
                    status:'400',
                    message: 'User has been taken!'
                })
            }else{
                db.query(sql2,(err2,result2)=>{
                    if (err) throw err2
                    let mailOption={
                        from: 'Bukatoko',
                        to:req.body.email,
                        subject: 'Verify your account!',
                        html: `<p> <a href="http://localhost:7000/auth/verify?username=${req.body.username}&email=${req.body.email}">Click here</a> to verify your account</p>`
                    }
                    transporter.sendMail(mailOption,(err3,info)=>{
                        if(err3) throw err3
                    })
                    res.send({
                        status:'201',
                        message:'Your account has been created, please check your email to verify your account'
                    })
                })
            }
        })  
    },

    verify:(req,res)=>{
        let username=req.query.username
        let sql= `update users set verified = 1 where username='${username}' `
        
        db.query(sql,(err,result)=>{
            if (err) throw err
            res.send('Akun anda berhasil diverifikasi') 
        })
    },

    testEmail:(req,res)=>{
        let options={
            format:'A4',
            orientation:'landscape',
            border:{
                top:'0.5in',
                right:'0.15in',
                left:'0.15in', 
                bottom:'0.25in'
            }
        }

        var d=new Date()

        let replacements={
            username:req.query.username,
            today:`${d.getDate()}-${d.getMonth()+1}`,
            data:['Wahai','Kalian','Kaum','JOMBLO']
        }

        pdfcreate('./4.pdfTemplates/firstTemplate.html',replacements,options,(stream)=>{
            res.attachment('testingPDF.pdf')
            stream.pipe(res)
            //.pipe buat langsung download
            console.log(stream)
            transporter.sendMail({
                from:'Purwadhika',
                to:'ricoantonio33@hotmail.com',
                subject:'Test attachment',
                html:'<h1>This is an attachment</h1>',
                attachments:[
                    {
                        filename:`${req.query.username}-${d.getDate()}-${d.getMonth()+1}.pdf`,
                        content:fs.createReadStream(stream.path)
                    }
                ]
            })
            
        })
    }
}