const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
const { create } = require('sourcebin')
const axios = require('axios')
const fetch = require('node-fetch')
module.exports ={
    name: `strangerthings`,
    permissions: [],
    cooldowns: 0,
    description: `The bot sends a line from stranger things. You can guess the person who said this line`,
	 async execute(client, message, args, Discord, profileData) {
         const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({filter , max: 1 , time:20000})
         const api_url = 'https://strangerthings-quotes.vercel.app/api/quotes/1'
         axios.get(api_url)
         .then((res) => {
             message.channel.send('Guess the author of the dialogue '+ `**${res.data[0].quote}**`)
             console.log(res.data[0].author)
             ans = res.data[0].author
             module.exports = ans;
         })
         collector.on('collect', async (m) => {
             answer = ans.split(' ')

             if(!m.author.id === message.author.id) return;
             if(m.author.bot) return;
             if(m.content.toLowerCase() === answer[0].toString().toLowerCase()){
                 message.channel.send('correct')
                 collector.stop()
             } else {
                 message.channel.send(`Wrong the answer was ${answer[0]}`)
                 collector.stop()
             }
        });
        collector.on('end', reason => {
                message.channel.send('You ran out of time!');
            
        });
	},
};