const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js')
const { MessageAttachment } = require('discord.js')
const CanvaCord = require('canvacord');
const levelModel = require('../models/Leveling')
module.exports ={
    name: `rank`,
    permissions: [],
    cooldowns: 0,
    description: `rip`,
	 async execute(client, message, args, Discord, profileData , LevelData) {
        if(LevelData.activation === true){
        const member = message.mentions.users.first() || message.author
       let ava = member.displayAvatarURL({format: 'png' , dynamic: true});
        const user = await Levels.fetch(member.id , message.guild.id);
        const neededxp = Levels.xpFor(parseInt(user.level) + 1)
        const randomN = Math.round(Math.random() * 9) + 1;
        if(member.bot) return message.channel.send("Bots dont have levels")
        
        const RankCard = new CanvaCord.Rank()
       .setAvatar(ava)
       .setCurrentXP(user.xp)
       .setLevel(user.level)
       .setStatus(message.member.presence.status)
       .setUsername(member.username)
       .setDiscriminator(member.discriminator)
       .setProgressBar('#a81d16' , "COLOR")
       .setOverlay('#000000')
       .setRequiredXP(neededxp)
       .setBackground('IMAGE' , 'https://media.discordapp.net/attachments/889924001441394698/933594378591690782/unknown.png')
       RankCard.build()
       .then(data => {
           const attach = new Discord.MessageAttachment(data , 'rank.png')
           message.channel.send({files: [attach]})
       })
        if(!user){
            Levels.createUser(message.author.id, message.guild.id);
            message.channel.send(`Your current level is ${user.level}!`)
        }
    } else return message.channel.send("Leveling system is disabled do **el!leveling enable** to enable it.")
    }
}