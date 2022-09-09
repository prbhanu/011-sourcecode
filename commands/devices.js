const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `devices`,
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const user = message.mentions.members.last() || message.member;
         const devices = user.presence?.clientStatus || {};
         console.log(devices)
         const description = () => {
            const entries = Object.entries(devices)
            .map((value , index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
            .join("\n");
            return `Devices:\n${entries}`;
           
       };
         const embed = new MessageEmbed()
         .setTitle(`${user.user.tag}'s Devices`)
         .setDescription(`${Object.entries(devices).map((value) => `${value[0][0].toUpperCase()}${value[0].slice(1)}`).join(", ")}`)
         message.channel.send({embeds: [embed]})
         console.log(devices)
}
     }