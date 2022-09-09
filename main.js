const Discord = require("discord.js")
const intents = require('discord.js')
const {google} = require("googleapis")
let DBD = require('discord-dashboard');
const { MessageEmbed , Collection} = require('discord.js')
const Levels = require('discord-xp')
Levels.setURL('mongodb+srv://clawrex:madarchor@discordbot.svrib.mongodb.net/levelSystem?retryWrites=true&w=majority');
require('dotenv').config();
const mongoose = require('mongoose')
const chatbot = require("./models/chatbot-model")
const chat_bot_api = require("discord-chatbot")
const chat_bot = new chat_bot_api({name:'011',gender:"Female"}) 
const client = new Discord.Client({
intents: [32767],
allowedMentions: ["Users"]
})
const prefix = "el!"
const fs = require("fs");
const levelModel = require('./models/Leveling')
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
client.distube = new DisTube(client, {
  plugins: [new SpotifyPlugin()],
});
new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
      clientId: "aeafe4447fef4c0f8b384dce225fad8a",
      clientSecret: "ac0a6c5acedc43a0b0c9a1c6bb628797",
    },
  });


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler' , 'event_handler' , 'error_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client , Discord);
})
mongoose.connect(process.env.mongoDb , {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() =>{
    console.log('connected');
}).catch((err)=>{
    console.log(err)
})
const pings = new Collection()
client.on('messageCreate' ,
 async  message =>  {
    if(levelModel.activation === true){
    if(message.author.bot) return;
    const randomN = Math.round(Math.random() * 9) + 1;
    const hasLevelUp = await Levels.appendXp(message.author.id , message.guild.id , randomN )
    if(hasLevelUp){
        const user = await Levels.fetch(message.author.id , message.guild.id)
        message.channel.send(`${message.author} You leveled up to ${user.level}! Keep moving your ass`)
    }
} else return
    if(!message.mentions.members.first()) return;
    if(message.mentions.members.first().id === message.author.id) return;
    const time = 5000
    pings.set(`pinged: ${message.mentions.members.first().id}` , Date.now() + time);
    setTimeout(() =>{
        pings.delete(`pinged: ${message.mentions.members.first().id}`)
        console.log('deleted')
    } , time)
})
client.on("messageCreate", async message =>{
    if(message.author.bot) return
    let chatbotmodel;
    chatbotmodel = await chatbot.findOne({serverId: message.guild.id})
    if(chatbotmodel.activation === false) return;
    else{
      if(chatbotmodel){
        if (message.author.bot) return;
        if(message.channel.id === chatbotmodel.channelId){
        chat_bot.chat(message.content).then(response => message.channel.send(response))
        }
      }
    }
})
client.on('messageDelete' , (message) => {
    if(!message.mentions.members.first()) return;
    console.log(pings)
    if(pings.has(`pinged: ${message.mentions.members.first().id}`)){
       const detect = new MessageEmbed()
        .setTitle('Ghost ping detected!')
        .setDescription(`Author: ${message.author} \n Pinged: ${message.mentions.members.first()}`)
        .setColor('RED')
        .setTimestamp()
        message.channel.send({embeds: [detect]})
    }
})


client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ),
    )
    .on('addSong', (queue, song) =>
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ),
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
    .on('finish', queue => queue.textChannel?.send('Finish queue!'))
    .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
    )
    .on('disconnect', queue =>
        queue.textChannel?.send('Disconnected!'),
    )
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
    // DisTubeOptions.searchSongs > 1
    .on('searchResult', (message, result) => {
        let i = 0
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${
                            song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        )
    })
    .on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )
    .on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )
    .on('searchNoResult', message =>
        message.channel.send('No result found!'),
    )
    .on('searchDone', () => {})
module.exports = client;



client.login(process.env.token_011);