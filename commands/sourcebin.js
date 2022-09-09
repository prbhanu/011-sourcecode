const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
const { create } = require('sourcebin')
module.exports ={
    name: `sourcebin`,
    permissions: [],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
         content = args.join(' ')
         create(
             [
                 {
                     name: 'Code',
                     content,
                     language: 'javascript',
                 }
             ],
         ).then((value) => {
             message.channel.send('Your code '+ value.url)
         })
	},
};