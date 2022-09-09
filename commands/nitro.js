const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require('discord.js')
module.exports = {
    name:'nitro',
    description:'turns your suggestion to embed',
    permissions:['SEND_MESSAGES'],
    execute(client , message , args , discord , cmd){
        let messageA = message.mentions.members.first();
        if(!messageA){
            message.channel.send('Pls mention a person')
        }if(messageA){
        message.channel.send({content: `${messageA} see the video and follow the steps to get nitro https://cdn.discordapp.com/attachments/861543676784934932/890457196368904262/video0_1-1.mp4`} )
    }
}
}