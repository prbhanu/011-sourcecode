const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `bj`,
    permissions: [],
    cooldowns: 300,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         number = Math.round(Math.random() * 299)+1
         const response = await  profileModel.findOneAndUpdate({
             userId: message.author.id
         } , {
             $inc: {
                 coins: number
             }
         })
         if (number < 100){
             msg = 'You did not satisfy your client so he gave you'
         } else if (number > 100){
            msg = 'You satisfied the client and they gave you'
         }
		 message.channel.send(`${msg}` + ` ${number}$`);
	},
};