const express = require('express')
const app = express()
const askQuestionRoutes = require('./routes/askquestion_routes')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const path = require('path')
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const dotenv = require('dotenv')
const dotenvb = require('dotenv').config()
mongoose.connect(process.env.MONOGODB).then(() => {
    console.log('database connected')
}).catch((err) => console.log(err))

const { engine } = require('express-handlebars');
// multiple layout below
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "index" }));
// app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "admin" }));
app.set('view engine', 'hbs');

// for frontend apps
app.use(cors())
// store image and videos 
app.use(express.static(path.join(__dirname, 'public')))

//api routes 
app.use('/api', askQuestionRoutes)




// not route found error 
app.use((req, res) => {
    res.status(404).json({ page: 'THIS URL NOT FOUND' })
})
// global error
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
})
app.listen(process.env.PORT, () => {
    console.log('Server listening..................')
})