const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: 'nightcore',
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const filter = client.distube.setFilter(message, 'nightcore')
        message.channel.send(
            `Current queue filter: ${filter.join(', ') || 'Off'}`,
        )
}
     }