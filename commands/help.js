const { MessageButton } = require('discord.js')

const{ Discord, MessageActionRow, MessageSelectMenu} = require("discord.js")

const {MessageEmbed} = require("discord.js")

module.exports ={
    name: `help`,
    permissions: [],
    cooldowns: 0,
    description: `bj`,
	 async execute(client, message, args, Discord, profileData) {
   
   
    const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("select")
      .setPlaceholder("Select your option")
      .addOptions([
        {
          label: "Economy",
          description: "Shows all the Economy commands",
          value: "economy"
        }, 
        {
          label: "Information",
          description: "Shows all the Information commands",
          value: "info"
        }, 
        {
          label: "Image Manipulation",
          description: "Shows all the Image Manipulation commands",
          value: "image"
        },
        {
          label: "AI ChatBot",
          description: "Shows all the AI ChatBot commands",
          value: "ai"
        },
        {
          label: "Music Commands",
          description: "Shows all the Music commands",
          value: "music"
        },
        {
          label: "Other",
          description: "Other Commands",
          value: "other"
        }
      ])
    )

    let embed = new MessageEmbed()
    .setTitle("HELP MENU")
    .setDescription(`
    Select One Of The Menu To See Commands.

    Prefix :-  **el!**
    `)
    .setColor("GREEN")
    .setFooter('011')

    
let embed1 = new MessageEmbed()
    .setTitle("Economy Commands List.")
    .setDescription(`
    el!bal    - Shows your balance.
    el!bj     - makes you do blowjob.    
    el!football - Makes you play football.
    el!deposit    - deposit the amount of coins you mentions into your bank. 
    el!withdraw   - withdraws amount of coins you mentioned from your bank.  
    `)
    .setColor("GREEN")
    .setFooter('011 - Stranger Things')

let embed2 = new MessageEmbed()
    .setTitle("Image Manipulation Commands List.")
    .setDescription(`
el!gay - It gays the person you mentioned.
el!invert - Changes color of user u mentioned.
el!rip  - Rips the person who you mentioned.
el!spank - Spanks the person you mentioned.
el!trash - trashes the person you mentioned.
el!wanted - Makes a wanted poster of the person you mentioned.
`)
    .setColor("GREEN")
    .setFooter('011 - Stranger Things')
  


let embed3 = new MessageEmbed()
    .setTitle("AI ChatBot Commands")
    .setDescription(`
el!chatbot #channel - Enables Chatbot in the mentioned channel.
el!chatbot-disable - Disables Chatbot if you have it enabled in a particular channel.
`)
    .setColor("GREEN")

let embed5 = new MessageEmbed()
    .setTitle("Music Commands")
    .setDescription(`
el!play song name - Plays song you mentioned.
el!queue - Disables shows you the queue list of upcoming songs.
el!pause - Pauses the song.
el!skip - Skips current song and starts playing next song.
el!stop - stops playing songs and leaves the voice channel
el!resume - resumes the song
       **filters**
el!3d
el!bassboost
el!vaporwave
el!echo
el!karaoke
el!nightcore
`)
    .setColor("GREEN")

let embed10 = new MessageEmbed()
    .setTitle("Other Commands")
    .setDescription(`
el!suggestion - Type a suggestion you wanna give to the server owner after el!suggestion.
el!sourcebin - el!sourcebin "your code" pastes your code in pastebin and gives the link.
el!devices @user - el!devices @user or el!devices send the devices the user logged in to discord.
el!strangermemes - Gives you a random stranger things meme.
el!say Any text - Joins the voice channel and converts your args to audio
`)
    .setColor("GREEN")
let embed60 = new MessageEmbed()
    .setTitle("Information Commands")
    .setDescription(`
el!botinfo - Sends a bunch of bot information.
`)
const collector = message.channel.createMessageComponentCollector({
  componentType: "SELECT_MENU"
})

collector.on("collect", async (collected) => {
const value = collected.values[0]

if(value === "economy") {
  collected.reply({embeds:[embed1], ephemeral:true})
}

if(value === "image") {
  collected.reply({embeds:[embed2], ephemeral:true})
}

if(value === "ai") {
  collected.reply({embeds:[embed3], ephemeral:true})
}

if(value === "music") {
  collected.reply({embeds:[embed5], ephemeral:true})
}

if(value === "other") {
  collected.reply({embeds:[embed10], ephemeral:true})
}
 if(value === "info") {
  collected.reply({embeds:[embed60], ephemeral:true})
}



})

message.reply({embeds : [embed], components:[row]})
  

  
  }

}