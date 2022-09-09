const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports ={
    name: `give`,
    permissions: [],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         if(!args.length) return message.channel.send('mention the person you wanna give coins to.')
         const ammount = args[1]
         const target = message.mentions.users.first()
         if(!target) return message.channel.send('The user does not exist')
         if(ammount % 1 != 0 || ammount<= 0) return message.channel.send('Mention a whole number idiot')
         try {
             const targetData = await profileModel.findOne({userId: target.id});
             if(!targetData)return message.channel.send(`the user ${target.tag} does'nt have a profile in my database. To create db do el!create`)
             await profileModel.findOneAndUpdate({
                 userId: target.id
             } , {
                 $inc: {
                     coins: ammount

                 }
             })
             await profileModel.findOneAndUpdate({
                userId: message.author.id
            } , {
                $inc: {
                    coins: -ammount
                }
            })
            message.channel.send(`You gave ${target.username} ${ammount} coins`)
         } catch(err){
             console.log(err)
         }
	},
};