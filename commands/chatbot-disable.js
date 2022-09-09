const { Message } = require("discord.js");
const { MessageAttachment } = require('discord.js')
const chatbotSchema = require("../models/chatbot-model");
module.exports = {
    name:'chatbot-disable',
    description:'turns your suggestion to embed',
    permissions:['ADMINISTRATOR'],
    execute(client , message , args , discord , cmd){
        const arg = args.join(" ")
        try{
        const model = chatbotSchema.findOneAndUpdate({serverId: message.guild.id , 
        }, {
            $set: {
                activation: false,
                channelId: null
            }
        }).then(message.channel.send("Disabled Chatbot"))
        const lol = chatbotSchema.findOne({serverId: message.guild.id})
        console.log(lol.activation , lol.channelId)
    }catch(err){
        console.log(err)
    }
    
    }
}