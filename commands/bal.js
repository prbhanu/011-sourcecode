const { MessageEmbed } = require('discord.js')
module.exports = {
    name: `bal`,
    permissions: [],
    description: `replies with balance`,
	 execute(client, message, args, Discord, profileData) {
        bal = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail('https://image.flaticon.com/icons/png/512/61/61584.png')
        .setTitle(`${message.author.tag}'s Balance`)
        .setDescription(`Wallet:`+ `${profileData.coins}` + '\n' + 
        'Bank: ' + `${profileData.bank} \n Total : ${profileData.coins}/${profileData.bank}`)
		 message.channel.send({embeds : [bal]});
	},
};