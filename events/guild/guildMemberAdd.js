const profileModel = require('../../models/profileSchema')
const { Message } = require('discord.js')

module.exports = async(client , discord , member)  => {
    let profile = await profileModel.create({
        userId: member.id,
        serverId: member.guild.id,
        coins: 1000,
        bank:0
    })
    if(profile){
        return
    }

    profile.save();
}