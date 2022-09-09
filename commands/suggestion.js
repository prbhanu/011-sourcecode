const { MessageEmbed } = require("discord.js");

module.exports = {
    name:'suggestion',
    description:'turns your suggestion to embed',
    permissions:['SEND_MESSAGES'],
    execute(client , message , args , discord , cmd){
        const channel = message.guild.channels.cache.find(c => 
            c.name === 'suggestions'
        )
        if(!channel) return message.reply('you dont have suggestions channel')

        let messageArgs = args.join(' ');
        const suggestion = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
        .setTitle('Suggestion')
        .setDescription(messageArgs)
        .setTimestamp();


        channel.send({embeds: [suggestion]}).then((msg)=>{
            msg.react('👍')
            msg.react('👎')
            message.delete()
        })
    }
}