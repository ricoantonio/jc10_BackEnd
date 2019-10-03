var express=require('express')
var app=express()
const port = 9500
var cors=require('cors')
var bodyParser = require('body-parser')
var multer=require('multer')
var mysql=require('mysql')
const fs =require('fs')

const db = mysql.createConnection({
    user:'root',
    password:'password',
    database:'latihan_upload_image',
    host:'localhost'
})


app.use(bodyParser.json())
app.use(cors())
// buat ngambil file dalam folder uploads locakhost:8080/files/fotoku.jpg
app.use('/files',express.static('uploads'))

let multerStorageConfig = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let filterConfig = (req,file,cb)=>{
    if(file.mimetype.split('/')[1]=='png'||file.mimetype.split('/')[1]== 'jpeg'){
        cb(null, true)
    }else{
        req.validation = {error:true,msg:'File must be an image'}
        cb(null, false)
    }
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

// di postman ambil dari body form data key filetype jadi file
app.post('/uploadimage', upload.single('aneh'), (req,res)=>{
    console.log(req)

    try {
        if(req.validation) throw req.validation
        if(req.file.size>5) throw {error:true,msg:'Image size to large'}
        let data=JSON.parse(req.body.data)
        db.query(`insert into data values (0,'${data.name}','${req.file.path.replace('uploads','files/')}', ${data.price})`, (err,result)=>{
            if (err) throw err
            res.send('Success')
        })
    } catch (error) {
        fs.unlinkSync(req.file.path)
        console.log(error)
    }
        
})

app.get('/getdata',(req,res)=>{
    db.query(`select * from data`,(err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})


app.listen(port,console.log(`listening in port ${port}`))