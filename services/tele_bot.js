const { Telegraf } = require('telegraf');
const xlog = require("../utils/xlog")
const shopeeService = require("../services/get_link")
const lodash = require("lodash")

// const mysql = require('mysql');

const bot = new Telegraf('8241739641:AAHjS1FgNp3rabRkNk7SdvAQ9jnpBKaJEzE');

//starting block
bot.command('start', ctx => {
    xlog.info(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Wellcome to Shoback Bot', {

    })
})

function extractUrls(text) {
    return text.match(/https?:\/\/[^\s"'<>]+/g) || [];
}


bot.on('message', async (ctx) => {
    try {
        let from = ctx.from
        let text = ctx.message.text

        let url = extractUrls(text)

        xlog.info("Parse link", {
            from: from,
            text: text,
            url: url
        })

        if (url.length === 0) {
            return ctx.reply('Không tìm thấy link để convert')
        }

        let linkData = await shopeeService.getLink(url[0], `${from.id}`)

        if (lodash.has(linkData, "data.batchCustomLink") === false) {
            return ctx.reply('Có chút vấn đề không thể lấy được shortlink')
        }

        if (lodash.isArray(linkData.data.batchCustomLink) === false) {
            return ctx.reply('Có chút vấn đề không thể lấy được shortlink')
        }

        let data = linkData.data.batchCustomLink[0]
        return ctx.reply(data.shortLink)
    } catch (error) {
        xlog.error(error)
        return ctx.reply('Có chút vấn đề không thể lấy được shortlink')

    }

})

bot.launch();