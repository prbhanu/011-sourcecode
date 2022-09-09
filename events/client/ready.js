const { Message } = require('discord.js')
const res = require('express/lib/response')

module.exports =  async () =>{
    

    const path = require('path')

    const client = require('../../main')
    console.log('bot is online')
    const guild = await client.channels.fetch('938768133517344839');
    guild.send('@everyone i am ready')

    const { getCommands } = require('../../utils')
    const clientDetails = {
        Guilds: client.guilds.cache.size,
        Users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
        channels: client.channels.cache.size,
    }
    client.user.setPresence({ activities: [{name: `el!help . Currently in ${client.guilds.cache.size} servers `, type: "PLAYING"}]});
    const express = require('express');

    const app = express()

    const port = 3000 || 3001

    app.set('view engine' , 'ejs')

    app.get('/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '..' , '..' , 'pages' , 'mainPage.html'))
        })
    app.get('/commands' , (req , res) => {
        const commands = getCommands()
        res.status(200).render('commands' , { commands })
        })
    app.get('/info',(req, res)=> {
        res.status(200).send(clientDetails)
    })
    app.listen(port)
}