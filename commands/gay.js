const { MessageEmbed } = require('discord.js')
const { MessageAttachment } = require('discord.js')
const profileModel = require('../models/profileSchema')
const Dig = require('discord-image-generation')
module.exports ={
    name: `gay`,
    permissions: [],
    cooldowns: 0,
    description: `rip`,
	 async execute(client, message, args, Discord, profileData) {
        let user = message.mentions.members.first()
        if(!user){
            message.channel.send('please mention a user')
        }
        let avatar = await user.user.displayAvatarURL({ dynamic: true, format: 'png' });
        gay = await new Dig.Gay().getImage(`${avatar}`);
         if(user){
            let attach = new Discord.MessageAttachment(gay ,"delete.png");;
            message.channel.send({files: [attach]})
        }
	},
};