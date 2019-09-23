var express=require('express')
var router=express.Router()
const {
    login,
    checkUser
}=require('../1.controllers/authController')
// const {authController}=require('../1.controllers')

router.get('/login', login)
router.get('/checkuser', checkUser)

module.exports=router