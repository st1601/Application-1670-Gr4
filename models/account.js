const mongoose = require('mongodb');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
    name: {type: String, maxLength: 255},
    username: {type: String, maxLength: 255},
    password: {type: String, maxLength: 255},
    role: {type: String, maxLength: 255},
});

module.exports = mongoose.model('Account', Account);