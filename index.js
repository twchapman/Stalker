require('dotenv').config();
const { Client } = require('discord.js');

const token = process.env.TOKEN;
const bot = new Client();
const command = '!turnips';

bot.login(token);

bot.on('ready', () => {
    console.log(bot.user.tag, 'listening for turnip prices.');
})

let prices = [];
let lastDay;
bot.on('message', message => {
    if (!message.content.startsWith(command)) {
        return;
    }

    const date = message.createdAt;
    if (date.getDay() !== lastDay) {
        prices = [];
        lastDay = date.getDay();
    }

    const param = message.content.substring(command.length).trim();

    const valueInt = parseInt(param)
    if (isNaN(valueInt)) {
        message.reply(`${valueInt} is not an integer, and therefore not a valid price.`);
        return;
    }
    const isBuyPrice = date.getDay() !== 0;
    const boughtOrSold = isBuyPrice ? 'bought' : 'sold';

    message.channel.send(`Turnips are being ${boughtOrSold} on ${message.member.user.username}'s island for **${valueInt}** bells.`);
})