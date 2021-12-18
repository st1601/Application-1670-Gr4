const express = require('express')
const app = express()
app.use(express.static('public'))
    //const { ObjectId, MongoClient } = require('mongodb');
const DATABASE_NAME = "Appdev1670";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', requiresLogin, (req, res) => {
    const user = req.session["User"]
    res.render('index', { userInfo: user })
})

app.post('/login', async(req, res) => {
    const name = req.body.txtName
    const pass = req.body.txtPass
    const role = await checkUserRole(name, pass)
    if (role == -1) {
        res.render('login')
    } else {
        req.session["User"] = {
            name: name,
            role: role
        }
        console.log("Ban dang dang nhap voi quyen la: " + role)
        res.redirect('/')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})


const adminController = require('./controller/admin')
app.use('/admin', adminController)

const trainerController = require('./Trainer')
app.use('/Trainer',trainerController)

const PORT = process.env.PORT || 5010
app.listen(PORT)
console.log("Server is running! " + PORT)