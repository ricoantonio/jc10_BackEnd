var express=require('express')
var router=express.Router()
const {
    login,
    register,
    verify
}=require('../1.controllers/authController')
// const {authController}=require('../1.controllers')

router.get('/login', login)
router.post('/register', register)
router.get('/verify',verify)


module.exports=router