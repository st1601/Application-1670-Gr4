const express = require('express')
const router = express.Router()
const DATABASE_NAME = "Appdev1670";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


router.get('/', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const total = await dbo.collection("totalCourse").find({}).toArray();
    res.render('trainerIndex', { dataTotal: total });
    return dbo;
})


router.get('/listTrainee', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allTrainee = await dbo.collection("listTrainee").find({}).toArray();
    res.render('ListTrainee', { dataTrainee: allTrainee });
    return dbo;
})

router.get('/GradeTrainee', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allGrade = await dbo.collection("listGrade").find({}).toArray();
    res.render('GradeTrainee', { data: allGrade });
    return dbo;
})

router.get('/CourseDetail', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const dataCourse = await dbo.collection("listCourse").find({}).toArray();
    res.render('CourseDetail', { CourseData: dataCourse });
    return dbo;
})

// ---------------------------------------------------TrainerIndex

router.post('/addListTotal', async(req, res) => {
    const CourseID = req.body.txtCourseId;
    const GradeID = req.body.txtGradeId;
    const TraineeID = req.body.txtTraineeId;
    var ObjectId = require('mongodb').ObjectId;
    const Course_Grade_Trainee = {
        CourseID: CourseID,
        GradeID: GradeID,
        TraineeID: TraineeID
    }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const newObject = await dbo.collection("totalCourse").insertOne(Course_Grade_Trainee);
    res.redirect("/Trainer");
})
router.post('/searchTotal', async(req, res) => {
    const searchInput = req.body.txtSearchCourse;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const listCourse = await dbo.collection("totalCourse").find({ CourseID: searchInput }).toArray();
    res.render('trainerIndex', { dataTotal: listCourse })
});

// router.post('/searchTrainee', async(req, res) => {
//     const searchTrainee = req.body.txtSearchTrainee;
//     const client = await MongoClient.connect(url);
//     const dbo = client.db(DATABASE_NAME);
//     const trainee = await dbo.collection("listTrainee").find({ ID: searchTrainee }).toArray();
//     res.render('ListTrainee', { dataTrainee: trainee })
// });



// -- -- -- -- -- -- -- -- -- -- -- ---------------- ------------------------ -- --GradeTrainee

router.post('/addGrade', async(req, res) => {
    const nameInput = req.body.txtTraineeGrade;
    const typeGrade = req.body.typeGrade;
    const newGrade = { name: nameInput, TypeGrade: typeGrade }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").insertOne(newGrade);
    res.redirect("/trainer/GradeTrainee");
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
    res.redirect("/Trainer/GradeTrainee");
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
    res.redirect("/Trainer/GradeTrainee");
})


// // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --------- ------------------------ manage trainee


router.post('/ListTrainee', async(req, res) => {
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
    res.redirect("/trainer/ListTrainee");
});
router.post('/searchTrainee', async(req, res) => {
    const searchTrainee = req.body.txtSearchTrainee;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const trainee = await dbo.collection("listTrainee").find({ ID: searchTrainee }).toArray();
    res.render('ListTrainee', { dataTrainee: trainee })
});

module.exports = router;