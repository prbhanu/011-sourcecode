const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: 'bassboost',
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const filter = client.distube.setFilter(message, 'bassboost')
        message.channel.send(
            `Current queue filter: ${filter.join(', ') || 'Off'}`,
        )
}
     }