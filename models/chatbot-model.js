const mongoose = require('mongoose')


const ChatbotSchema = new mongoose.Schema({
    serverId: {type: String },
    activation: {type: Boolean },
    channelId: {type: String },
})

const ChatbotModel = mongoose.model('ChatbotSchema' , ChatbotSchema);
module.exports = ChatbotModel;