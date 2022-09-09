const { MessageEmbed } = require("discord.js");
var Scraper = require('images-scraper');
const google = new Scraper({
    puppeteer: {
        headless: true
    }
}) 

module.exports = {
    name:'image',
    cooldowns:0,
    description:'turns your suggestion to embed',
    permissions:['SEND_MESSAGES'],
    async execute(client , message , args , discord , cmd){
        const image_query = args.join(' ');
        if(!image_query){
            message.channel.send('pls enter a image name')
        }
        const image_results = await google.scrape(image_query , 1)
        message.channel.send({files: [image_results[0].url]})
    }
}