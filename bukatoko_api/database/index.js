var mysql=require('mysql')

const db = mysql.createConnection({
    user:'root',
    password:'password',
    database:'bukatoko',
    host:'localhost'
})

module.exports=db