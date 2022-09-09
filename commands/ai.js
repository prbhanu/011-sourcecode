const { Message } = require("discord.js");
const { MessageAttachment } = require('discord.js')
const chatbotSchema = require("../models/chatbot-model");
module.exports = {
    name:'chatbot',
    description:'turns your suggestion to embed',
    permissions:['ADMINISTRATOR'],
    execute(client , message , args , discord , cmd){
        const channel = message.mentions.channels.first()
        if(!channel){
            message.reply(`Pls tell me where should i enable the chatbot.`)
        }
        if(args){
            chatbotSchema.findOne({serverId: message.guild.id} , (err , data) =>{
                if(err) return console.log(err)
                if(data){
                    const model = chatbotSchema.findOneAndUpdate({serverId: message.guild.id , 
                    }, {
                        $set: {
                            activation: true,
                            channelId: channel.id
                        }
                    }).then(message.channel.send("Enabled Chatbot"))
                }if(!data){
                    const newChatbot = new chatbotSchema({
                        serverId: message.guild.id,
                        activation: true,
                        channelId: channel.id,
                    })
                    newChatbot.save().then(() =>{
                        message.reply(`The chatbot is now enabled`)
                    }).catch(err =>{
                        console.log(err)
                    })
                }
            })
        }
    }
}