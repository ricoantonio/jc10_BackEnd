const db =require('../database')

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
    // login:(req,res)=>{
    //     db.query(`select * from users where username = '${req.query.username}' and password='${req.query.password}'`, 
    //         (err,result)=>{
    //         if (err) throw err
    //         res.send(result)
    //     })
    // // },
    // checkUser:(req,res)=>{
    //     db.query(`select * from users where username = '${req.query.username}'`, 
    //         (err,result)=>{
    //         if (err) throw err
    //         res.send(result)
    //     })
    // }
    register:(req,res)=>{
        let sql= `select * from users where username='${req.body.username}'`
        let sql2=`insert into users value (0, '${req.body.username}', '${req.body.password}','${req.body.email}', 0 )`
        
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
                    res.send({
                        status:'201',
                        message:'Your account has been created'
                    })
                })
            }
        })  
    
    
    
    }
}