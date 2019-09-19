var express=require('express')
var router=express.Router()
const {login}=require('../1.controllers/authController')
// const {authController}=require('../1.controllers')

router.get('/login', login)

module.exports=router