const mongoose = require('mongoose')

const birthdaySchema = new mongoose.Schema({
    userId: String,
    birthday: String
}) 
module.exports = mongoose.model('birthday' ,birthdaySchema )