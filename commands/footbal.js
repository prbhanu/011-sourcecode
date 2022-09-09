const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/profileSchema')
module.exports = {
    name: 'football',
    permissions: [],
    cooldowns: 300,
    description: `play football`,
    async execute(client, message, args, Discord, profileData) {
        um =  9999+1
        const positions = {
            left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
            middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
            right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
        };
        let randomized = Math.floor(Math.random() * Object.keys(positions).length);
        let gameEnded = false;
        let randomPos = positions[Object.keys(positions)[randomized]];

        const componentsArray = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'left',
                        label: 'Left',
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'middle',
                        label: 'Middle',
                    },
                    {
                        type: 2,
                        style: 'SECONDARY',
                        custom_id: 'right',
                        label: 'Right',
                    },
                ],
            },
        ];

        const msg = await message.channel.send({
            content: randomPos,
            components: componentsArray,
        });
        function update() {
            randomized = Math.floor(Math.random() * Object.keys(positions).length);
            randomPos = positions[Object.keys(positions)[randomized]];

            msg.edit({
                content: randomPos,
                components: componentsArray,
            });
        }
        setInterval(() => {
            if(gameEnded == false) return update();
        }, 1000);

        const filter = button => {
            return button.user.id === message.author.id;
        };
        const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

        if(button.customId !== Object.keys(positions)[randomized]) {
            gameEnded = true;
            const response = await  profileModel.findOneAndUpdate({
                userId: message.author.id
            } , {
                $inc: {
                    coins: um
                }
            })
            return button.reply({ content: `You won! and you got **${um}** Coins  ` });
        }
        else {
            um = 2999 + 1
            gameEnded = true;
            const response = await  profileModel.findOneAndUpdate({
                userId: message.author.id
            } , {
                $inc: {
                    coins: um
                }
            })
            return button.reply({ content: `You lose and you got **${um}** Coins` });
        }
        
        
    },
};