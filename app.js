const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.static('public'))

app.use('/lib', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({extended: true}))



const selectRouter = require('./router/select')
app.use('/', selectRouter)



let _port = 80
app.listen(_port)

console.log('http://127.0.0.1:' + _port)
