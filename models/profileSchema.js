const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {type: String , required:true , unique:true},
    serverId: {type: String , required: true},
    coins: {type: Number , default: 1000},
    bank: {type: Number , }
})


const model = mongoose.model('ProfileSchema' , profileSchema);
module.exports = model;