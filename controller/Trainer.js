const express = require('express')
const router = express.Router()
const DATABASE_NAME = "Appdev1670";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


// router.get('/', (req, res) => {
//         res.render('GradeTrainee')
//     })
// ---------------------------------------------------TrainerMain
router.get('/addCourseButton', async(req, res) => {
    // const id = req.query.id;
    // var ObjectId = require('mongodb').ObjectId;
    // const client = await MongoClient.connect(url);
    // const dbo = client.db(DATABASE_NAME);
    // const newCourse = await dbo.collection("listCourse").findOne({
    //     _id: ObjectId(id)
    // });
    res.render('addCourse')
})

router.get('/GradeTrainee', async(req, res) => {

    res.render('GradeTrainee')
})

router.get('/CourseDetail', async(req, res) => {

    res.render('/trainer/CourseDetail');
})

router.get('/ListTrainee', async(req, res) => {

    res.render('ListTrainee')
})

// -- -- -- -- -- -- -- -- -- -- -- ---------------- -- -- --GradeTrainee
router.get('/Trainer', (req, res) => {
    res.render('GradeTrainee')
})
router.post('/addGrade', async(req, res) => {
    const nameInput = req.body.txtTraineeGrade;
    const typeGrade = req.body.typeGrade;
    const newGrade = { name: nameInput, TypeGrade: typeGrade }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").insertOne(newGrade);
    res.redirect("/Trainer");
})

router.post('/searchGrade', async(req, res) => {
    const searchInput = req.body.txtSearch;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allGrade = await dbo.collection("listGrade").find({ name: searchInput }).toArray();
    res.render('GradeTrainee', { data: allGrade })
});

router.get('/deleteGrade', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").deleteOne({ "_id": ObjectId(id) });
    res.redirect("/Trainer");
});

router.get('/editGrade', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const g = await dbo.collection("listGrade").findOne({
        _id: ObjectId(id)
    });
    res.render('editGrade', { changeGrade: g });
})

router.post('/updateGrade', async(req, res) => {
    const id = req.body.txtId;
    var ObjectId = require('mongodb').ObjectId;
    const nameInput = req.body.txtTraineeGrade;
    const typeGrade = req.body.typeGrade;
    const filter = { _id: ObjectId(id) }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").updateOne(filter, { $set: { name: nameInput, TypeGrade: typeGrade } })
    res.redirect("/Trainer");
})

router.get('/', async(req, res) => {
        const client = await MongoClient.connect(url);
        const dbo = client.db(DATABASE_NAME);
        const allGrade = await dbo.collection("listGrade").find({}).toArray();
        res.render('GradeTrainee', { data: allGrade });
        return dbo;
    })
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- manage trainee
router.get('/Trainer/ListTrainee', (req, res) => {
    res.render('ListTrainee')
})
router.post('/addTrainee', async(req, res) => {
    const idInput = req.body.txtID;
    const nameInput = req.body.txtName;
    const gmailInput = req.body.txtGmail;
    const ageInput = req.body.txtAge;
    const BirthdayInput = req.body.txtBirthday;
    const newTrainee = { ID: idInput, Name: nameInput, Gmail: gmailInput, Age: ageInput, Birthday: BirthdayInput }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listTrainee").insertOne(newTrainee);
    res.redirect("/Trainer/ListTrainee");
})
router.get('/deleteTrainee', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listTrainee").deleteOne({ "_id": ObjectId(id) });
    res.redirect("/Trainer/ListTrainee");
});

module.exports = router;