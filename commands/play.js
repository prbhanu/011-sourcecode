const { MessageEmbed } = require('discord.js')
module.exports = {
    name: `play`,
    permissions: [],
    description: `replies with balance`,
	 execute(client, message, args, Discord, profileData) {
        const voiceChannel = message.member?.voice?.channel
        console.log("DISTUBE === SHIT")
        if (voiceChannel) {
            client.distube.play(voiceChannel, args.join(' '), {
                message,
                textChannel: message.channel,
                member: message.member,
            })
        } else {
            message.channel.send(
                'You must join a voice channel first.',
            )
        }
	},
};