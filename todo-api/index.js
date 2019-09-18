var express = require('express')
var app =express()
var bodyParser =require("body-parser")
var cors=require("cors")
const port = 8080
const db =require('./database/index')

const {getList,
        addTodo,
        deleteTodo,
        completeAction,
        getListByCompleted,
        getUserByRole,
        editTodo} = require("./1.controllers/todoControllers")

app.use(bodyParser())
app.use(cors())

/**
 * CRUD
 * 
 * Create
 * Read
 * Update
 * Delete
 * 
 */
 
app.get('/',(req,res)=>[
    res.send(`<h1>Selamat datang di API TODO JC10 JKT</h1>`)
])

app.get ('/getlist',getList)

app.get ('/getlistcompleted',getListByCompleted)

app.post('/addtodo', addTodo)

app.delete('/deletetodo/:id',deleteTodo)

app.put ('/edittodo',editTodo)

app.put ('/completeaction',completeAction)

// axios.get (localhotst 8080).then(()=>{})

app.get ('/getusersbyrole', getUserByRole)

app.listen(port,console.log("listening in port "+port))
