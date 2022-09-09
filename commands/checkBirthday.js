const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require('discord.js');
const birthdayModel = require('../models/Birthday')
module.exports = {
    name:'checkbirthday',
    description:'turns your suggestion to embed',
    permissions:[],
    cooldowns:0,
    execute(client , message , args , discord , cmd){
       const user = message.author

       birthdayModel.findOne({userId: user.id} , async(err,data) => {
           if(!data){
               message.channel.send(`The user is not there in my database`)
           } else {
               message.channel.send(`${user.tag} birthday is on ${data.birthday}`)
           }
       })
}
}