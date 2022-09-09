const { MessageEmbed } = require('discord.js')
const levelModel = require('../models/Leveling')


module.exports ={
    name: `leveling`,
    permissions: ["ADMINISTRATOR"],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData , LevelData) {
        args = args.join(" ");

        if(!args){
            message.reply("pls tell should i disable or enable")
        }
        if(args.toLowerCase() === "disable"){
            await levelModel.findOneAndUpdate({serverId: message.guild.id
            }, {
                $set: {
                    activation: false
                }
            })
            message.channel.send("Disabled leveling system in your server")
        }
        if(args.toLowerCase() === "enable"){
            await levelModel.findOneAndUpdate({serverId: message.guild.id
            }, {
                $set: {
                    activation: true
                }
            })
            message.channel.send("Leveling enabled")
        }
	},
};