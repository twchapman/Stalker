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

const sortPrices = () => prices = prices.sort((a, b) => a.price > b.price);

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
    const isBuyPrice = date.getDay() === 0;

    if (param.length === 0) {
        if (prices.length === 0) {
            message.channel.send('No turnip prices have been listed today. Add yours with `!turnips 123`');
            return;
        }
    } else {
        const valueInt = parseInt(param)
        if (isNaN(valueInt)) {
            message.reply(`${valueInt} is not an integer, and therefore not a valid price.`);
            return;
        }

        const user = message.member.displayName;
        const boughtOrSold = isBuyPrice ? 'bought' : 'sold';
        message.channel.send(`Turnips can be ${boughtOrSold} on ${user}'s island for **${valueInt}** bells.`);
        prices.push({ username: user, price: valueInt })
    }

    sortPrices();
    const buyOrSell = isBuyPrice ? 'buy' : 'sell';
    const bestPrice = isBuyPrice ? prices[price.length - 1] : prices[0];
    message.channel.send(`Current best price to ${buyOrSell} turnips is on **${bestPrice.username}**'s island for **${bestPrice.price}** bells.`);
})