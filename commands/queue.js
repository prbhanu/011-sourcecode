const { MessageEmbed } = require('discord.js')


module.exports ={
    name: `queue`,
    permissions: [],
    cooldowns: 0,
    description: `rip`,
	 async execute(client, message, args, Discord, profileData) {
        const voiceChannel = message.member?.voice?.channel
        const queue = client.distube.getQueue(message)
        if (!queue) {
            message.channel.send('Nothing playing right now!')
        } else {
            message.channel.send(
                `Current queue:\n${queue.songs
                    .map(
                        (song, id) =>
                            `**${id ? id : 'Playing'}**. ${
                                song.name
                            } - \`${song.formattedDuration}\``,
                    )
                    .slice(0, 10)
                    .join('\n')}`,
            )
        }
    }
}