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

const CONTACT = "@w0odx"

bot.on('message', async (ctx) => {
    try {
        let from = ctx.from
        let text = ctx.message.text

        let urls = extractUrls(text)

        xlog.info("Parse link", {
            from: from,
            text: text,
            urls: urls
        })

        if (urls.length === 0) {
            return ctx.reply('Không tìm thấy link để convert')
        }

        let linkData = await shopeeService.getLink(urls, `${from.id}`)

        if (lodash.has(linkData, "data.batchCustomLink") === false) {
            xlog.info("Có vấn đề khi lấy link", linkData)
            return ctx.reply(`Có chút vấn đề không thể lấy được shortlink. Làm ơn liên hệ ${CONTACT}`)
        }

        if (lodash.isArray(linkData.data.batchCustomLink) === false) {
            return ctx.reply(`Có chút vấn đề không thể lấy được shortlink. Làm ơn liên hệ ${CONTACT}`)
        }

        let response = ""
        for (let record of linkData.data.batchCustomLink) {
            if (lodash.has(record, "shortLink") === true && record.shortLink.length === 0) {
                continue
            }
            response += record.shortLink + "\n"
        }

        return ctx.reply(response)
    } catch (error) {
        xlog.error(error)
        return ctx.reply('Có chút vấn đề không thể lấy được shortlink')

    }

})

bot.launch();