const { MessageEmbed } = require('discord.js')
const { MessageAttachment } = require('discord.js')
const profileModel = require('../models/profileSchema')
const Dig = require('discord-image-generation')
module.exports ={
    name: `spank`,
    permissions: [],
    cooldowns: 0,
    description: `rip`,
	 async execute(client, message, args, Discord, profileData) {
         avatarr = message.author
        let user = message.mentions.members.first()
        if(!user){
            message.channel.send('please mention a user')
        }
        let avatar = await user.displayAvatarURL({ dynamic: true, format: 'png' });
        let spanker = await avatarr.displayAvatarURL({ dynamic: true, format: 'png' });
        spanked = await new Dig.Spank().getImage(`${spanker}` , `${avatar}`)
         if(user){
            let attach = new Discord.MessageAttachment(spanked, "delete.png");;
            message.channel.send({files: [attach]})
        }
	},
};