require('dotenv').config();
const { Client } = require('discord.js');

const token = process.env.TOKEN;
const bot = new Client();
const command = '!turnips';

bot.login(token);

bot.on('ready', () => {
    console.log(bot.user.tag, 'listening for turnip prices.');
})

bot.on('message', message => {
    if (!message.content.startsWith(command)) {
        return;
    }

    const value = message.content.substring(command.length);
    const valueInt = parseInt(value)
    if (isNaN(valueInt)) {
        message.reply(`${valueInt} is not an integer, and therefore not a valid price.`);
        return;
    }

    message.reply(`current price is ${valueInt}`);
})