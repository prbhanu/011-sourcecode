const fs = require("fs")
var files = fs.readdirSync("../../memes/stranger")
const discord = require("discord.js")
module.exports = {
    name:'strangermemes',
    description:'turns your suggestion to embed',
    permissions:['ADMINISTRATOR'],
    execute(client , message , args , discord , cmd){
        const chosenFile = files[Math.floor(Math.random() * 10)]
        const meme = `E:/MEMES/STRANGER/${chosenFile}`
        const attachment = new discord.MessageAttachment(meme,"Stranger Things meme.jpg")
        console.log(attachment)
        message.reply({files:[attachment]})
    }
}