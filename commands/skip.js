const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `skip`,
    permissions: [],
    cooldowns:0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         client.distube.skip(message)
}
     }