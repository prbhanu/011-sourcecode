const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: 'stop',
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         client.distube.voices.get(message)?.leave()
         message.channel.send('Left the voice channel!')
}
     }