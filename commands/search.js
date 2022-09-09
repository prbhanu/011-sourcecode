const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `search`,
    permissions: [],
    cooldowns: 300,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const locations = [
             "Bed",
             "Sofa",
             "Your mom",
             "Pocket",
             "Bag",
             "Jacket",
             "discord",
         ];
         const choosen = locations.sort(() => Math.random() - Math.random()).slice(0 , 3)
         const filter = ({author , content}) => message.author == author && choosen.some((locations) => locations.toLowerCase() == content.toLowerCase())
         const collector = message.channel.createMessageCollector(filter, {max: 1 , time:20000})
         const earnings = Math.floor(Math.random()*(1000 - 100 + 1))+ 100
         collector.on('collect', async (m) => {
            message.channel.send(`You found ${earnings} coins!`);

            await profileModel.findOneAndUpdate(
                {
                    userId: message.author.id,
                },
                {
                    $inc: {
                        coins: earnings,
                    },
                }
            );
        });
        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.channel.send('You ran out of time!');
            }
        });
        message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${choosen.join('` `')}\``);
	},
};