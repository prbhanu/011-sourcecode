const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `deposit`,
    permissions: [],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         const ammount = args[0]
         if(ammount % 1 != 0 || ammount<= 0) return message.channel.send('Deposit a whole number idiot')
         try{
             if(ammount > profileData.coins) return message.channel.send(`you dont have ${ammount} in your wallet to deposit`)
             await profileModel.findOneAndUpdate({
                 userId: message.author.id

             }, {
                 $inc: {
                     coins: -ammount,
                     bank: ammount,
                 }
             }
             )
             message.channel.send(`You deposited ${ammount} in to your bank`)
         } catch(err){
             console.log(err)
         }
	},
};