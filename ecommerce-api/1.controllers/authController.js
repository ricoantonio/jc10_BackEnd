const db =require('../database')

module.exports={
    login:(req,res)=>{
        db.query(`select * from users where username = '${req.query.username}' and password = '${req.query.password}' `, 
            (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    },
    checkUser:(req,res)=>{
        db.query(`select * from users where username = '${req.query.username}'`, 
            (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    }
}