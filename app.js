const express = require('express')
const app = express()
app.use(express.static('public'))
    //const { ObjectId, MongoClient } = require('mongodb');
const DATABASE_NAME = "Appdev1670";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

const TrainerCtl = require('./controller/Trainer')
app.use('/Trainer', TrainerCtl)

const PORT = process.env.PORT || 5010
app.listen(PORT)
console.log("Server is running! " + PORT)