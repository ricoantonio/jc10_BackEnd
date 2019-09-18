const db = require('../database')

module.exports={
    getList:(req,res)=>{
        db.query(`select * from todo`, (err,result)=>{
            try{
                if (err) throw err
                res.send(result)
            }catch{
                console.log(err);
            }
        })
    },

    getListByCompleted:(req,res)=>{
        let sql=`select * from todo where isCompleted='${req.query.param}'`
        // req.quary buat method get
        // di postman localhost:8080/getlistcompleted?param=(inputan)
        db.query(sql, (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    },

    addTodo:(req,res)=>{
        db.query(`insert into todo values (0,'${req.body.action}',0)`, (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    },
    deleteTodo:(req,res)=>{
        var id = req.params.id
        db.query(`delete from todo where id=${id}`, (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    },
    editTodo:(req,res)=>{
        db.query(`update todo set action='${req.body.action}' where id=${req.body.id}`, (err,result)=>{
            if (err) throw err
            res.send('Update Success!')
            // insert del update send('string')
        })
    },
    completeAction:(req,res)=>{
        db.query(`update todo set isCompleted=1 where id=${req.body.id}`, (err,result)=>{
            if (err) throw err
            res.send('Update Success!')
        })
    },
    getUserByRole:(req,res)=>{
        db.query(`select * from users where role='${req.query.role}'`, (err,result)=>{
            if (err) throw err
            res.send(result)
        })
    }
}