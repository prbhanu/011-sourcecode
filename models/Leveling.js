const mongoose = require('mongoose')

const LevelSchema = new mongoose.Schema({
    serverId: {type: String , required: true},
    activation: {type: Boolean , required: true , default: true}
})


const levelModel = mongoose.model('LevelSchema' , LevelSchema);
module.exports = levelModel;