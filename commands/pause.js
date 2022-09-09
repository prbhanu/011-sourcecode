const { MessageEmbed } = require('discord.js')


module.exports ={
    name: `pause`,
    permissions: [],
    cooldowns: 0,
    description: `rip`,
	 async execute(client, message, args, Discord, profileData) {
        const voiceChannel = message.member?.voice?.channel
        await client.distube.pause(message)
    }
}