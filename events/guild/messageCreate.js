require('dotenv').config()
prefix = process.env.prefix
const profileModel = require('../../models/profileSchema')
const Leveling = require('../../models/Leveling')
const cooldowns = new Map()
const chatbot = require("../../models/chatbot-model")
const chat_bot_api = require("discord-chatbot")
const chat_bot = new chat_bot_api({name:'011',gender:"Female"}) 

module.exports = async(Discord , client , message) => {
  
    

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let LevelData;
    try{
      LevelData = await Leveling.findOne({serverId: message.guild.id})
      if(!LevelData){
        let level = await Leveling.create({
          activation: true,
          serverId: message.guild.id,
      })
      }
    } catch(err){
      console.log(err)
    }
    if(message.mentions.has(client.user)) message.channel.send("Prefix is **el!** .")
    let profileData;
    try {
      profileData = await profileModel.findOne({userId: message.author.id})
      if(!profileData){
        let profile = await profileModel.create({
          userId: message.author.id,
          serverId: message.guild.id,
          coins: 1000,
          bank:0
      })
      }
    }catch(err){
      console.log(err)
    }
    let chatbotmodel;
    chatbotmodel = await chatbot.findOne({serverId: message.guild.id})
    try{
      if(chatbotmodel){
        if (message.author.bot) return;
        if(message.channel.id === chatbotmodel.channelId){
        chat_bot.chat(message.content).then(response => message.channel.send(response))
        }
      }
    }catch(err){
      console.log(err)
    }

// lol
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const commands = client.commands.get(cmd);
    if(!cooldowns.has(commands?.name)){
      cooldowns.set(commands?.name , new Discord.Collection())
    }
    const currentTime = Date.now();
    const timeStamps = cooldowns.get(commands?.name);
    const cooldownAmmount = (commands?.cooldowns) * 1000

    if(timeStamps.has(message.author.id)){
      const expiration_time = timeStamps.get(message.author.id) + cooldownAmmount
    
    if(currentTime < expiration_time){
      const time_left = (expiration_time - currentTime) / 1000;
      return message.reply(`Please wait ${time_left.toFixed(1)} secs before using ${commands.name}`)
    }
  }
  timeStamps.set(message.author.id , currentTime)
  setTimeout(() => timeStamps.delete(message.author.id) , cooldownAmmount);
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
      ]
    
      if(commands?.permissions?.length){
        let invalidPerms = []
        for(const perm of commands.permissions){
          if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
          }
          if(!message.member.permissions.has(perm)){
            invalidPerms.push(perm);
          }
        }
        if (invalidPerms.length){
          return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
      }

    if(commands) commands.execute(client , message , args , Discord , profileData , LevelData);
}
