if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
    
}



const express = require('express')
const app= express();
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//set routes
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


app.set('view engine', 'ejs')
//app.set('views', __dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts);                
app.use(express.static('public'))

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//database setup
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected to mongoose'))



app.use('/',indexRouter)                //router indexs
app.use('/authors',authorRouter)        //route authors 
app.use('/books',bookRouter)            //route books 

app.listen(process.env.PORT || 3000)
