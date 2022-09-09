const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: '3d',
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const filter = client.distube.setFilter(message, '3d')
        message.channel.send(
            `Current queue filter: ${filter.join(', ') || 'Off'}`,
        )
}
     }