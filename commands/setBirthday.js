const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require('discord.js');
const birthdayModel = require('../models/Birthday')
module.exports = {
    name:'setbirthday',
    description:'turns your suggestion to embed',
    permissions:[],
    cooldowns:0,
    execute(client , message , args , discord , cmd){
        const months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }
        const joined = args.join(' ');
        const split = joined.trim().split('/')

        let [day, month] = split;
        if(!day){
            message.channel.send('Pls mention a date')
        }
        if(!month) return message.channel.send('Pls mention a month')
        if(isNaN(day) || isNaN(month)) return message.channel.send('Pls mention your birthday using numbers')


        day = parseInt(day)
        month = parseInt(month)


        if(!day || day > 31) return message.channel.send('Wrong format')
        if(!month || month > 12) return message.channel.send('Wrong format')
        const convertedDay = suffixes(day);
        const convertedMonth = months[month]
        const birthdayString = `${convertedDay} of ${convertedMonth}`
        birthdayModel.findOne({
            userId: message.author.id 
        } , async(err,data) => {
            if(data){
                date.birthday = birthdayString;
                data.save();
            } else {
                new birthdayModel({
                    userId: message.author.id,
                    birthday: birthdayString
                }).save();
            }
        })

        message.channel.send(`I will wish you on **${convertedDay} of ${convertedMonth}**`)
}
}

/**
 * 
 * @param {Number} number 
 */
function suffixes(number){
    const conveted = number.toString()
    const lastChar = conveted.charAt(conveted.length - 1)

    return lastChar == '1' ? `${conveted}st` : lastChar == '2' ? `${conveted}nd` : lastChar == '3' ? `${conveted}rd` : `${conveted}th`
}