const { Telegraf } = require('telegraf');
const xlog = require("../utils/xlog")

// const mysql = require('mysql');

const bot = new Telegraf('8241739641:AAHjS1FgNp3rabRkNk7SdvAQ9jnpBKaJEzE');

//starting block
bot.command('start', ctx => {
    xlog.info(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Wellcome to Shoback Bot', {

    })
})

bot.on('message', (ctx) => {
    console.log(ctx.message)
    ctx.reply('Mình nhận được message rồi 👌')
})

bot.launch();