const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `withdraw`,
    permissions: [],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const ammount = args[0]
         if(ammount % 1 != 0 || ammount<= 0) return message.channel.send('withdraw a whole number idiot')
         try{
             if(ammount > profileData.bank) return message.channel.send(`you dont have ${ammount} in your bank to withdraw`)
             await profileModel.findOneAndUpdate({
                 userId: message.author.id

             }, {
                 $inc: {
                     coins: ammount,
                     bank: -ammount,
                 }
             }
             )
             message.channel.send(`You withdrawn ${ammount} in to your bank`)
         } catch(err){
             console.log(err)
         }
	},
};