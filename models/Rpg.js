const mongoose = require('mongoose')

const RpgSchema = new mongoose.Schema({
    userId: {type: String , required:true , unique:true},
    serverId: {type: String , required: true},
    Player: {type: String}
})


const model = mongoose.model('RpgSchema' , RpgSchema);
module.exports = model;