var express=require('express')
var app=express()
const port = 9500
var cors=require('cors')
var bodyParser = require('body-parser')
var multer=require('multer')
var mysql=require('mysql')


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
    // console.log(req)
    res.send('Success')
})

app.get('/getdata',(req,res)=>{
    db.query(`select * from data`,(err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

app.post('/adddata',(req,res)=>{
    db.query(`insert into data values (0,'${req.body.name}','${req.body.img}')`, (err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.listen(port,console.log(`listening in port ${port}`))