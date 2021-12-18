const {ObjectId,MongoClient} = require('mongodb');
const url = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function checkUserRole(nameI, passI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ userName: nameI, password: passI });
    if (user == null) {
        return "-1"
    } else {
        console.log(user)
        return user.role;
    }
}

async function insertProduct(newProduct) {
    const dbo = await getDB();
    await dbo.collection("products").insertOne(newProduct);
}

async function updateProduct(id, nameInput, quantityInput, priceInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput, quantity: quantityInput, price: priceInput } };

    const dbo = await getDB ();
    await dbo.collection("products").updateOne(filter, newValue);
}
async function getProductById(id) {
    const dbo = await getDB();
    const p = await dbo.collection("products").findOne({ _id: ObjectId(id) });
    return p;
}
async function deleteProduct(id) {
    const dbo = await getDB();
    await dbo.collection("products").deleteOne({ "_id": ObjectId(id) });
}
module.exports = {getDB,insertProduct,updateProduct,getProductById,deleteProduct,insertObject, checkUserRole}