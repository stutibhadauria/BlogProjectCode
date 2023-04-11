const express = require('express')
const app =express()
const connectdb=require('./db/connect_db')
const port =3000
const bodyParser=require('body-parser')
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
app.use(cookieParser())
var session = require('express-session')
var flash = require('connect-flash');
const router=require('./routes/web')



//image
app.use(fileUpload({useTempFiles: true}));


app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
app.use(flash());
  
// mongo db connections
connectdb()

app.use(express.static('public'))

// setup ejs
app.set('view engine','ejs')

//body-parser
app.use(express.urlencoded({extended:false}))

const web =require('./routes/web.js')


//router link
app.use('/',web)




app.listen(port,()=>{
    console.log(`server started on localhost:${port}`)
})