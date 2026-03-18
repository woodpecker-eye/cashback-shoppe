const { Telegraf } = require('telegraf');
const xlog = require("../utils/xlog")
const wsBridge = require("./ws_bridge")

// Khi chạy trực tiếp (node services/tele_bot.js) thì tự khởi động WS server
if (require.main === module) {
    wsBridge.startStandaloneServer()
}

// const mysql = require('mysql');

const bot = new Telegraf('8241739641:AAHjS1FgNp3rabRkNk7SdvAQ9jnpBKaJEzE');

//starting block
bot.command('start', ctx => {
    xlog.info(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Wellcome to Shoback Bot', {

    })
})

function extractUrls(text) {
    return text.match(/https?:\/\/[^\s"<>]+/g) || [];
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

        if (!wsBridge.isConnected()) {
            return ctx.reply(`Extension chưa kết nối. Làm ơn liên hệ ${CONTACT}`)
        }

        const username = from.username || from.first_name || `${from.id}`
        const links = await wsBridge.getLink(urls.join("\n"), `${from.id}`, username)

        if (!links || links.length === 0) {
            return ctx.reply(`Không lấy được shortlink. Làm ơn liên hệ ${CONTACT}`)
        }

        // Thay từng URL gốc bằng short link tương ứng
        let response = text
        urls.forEach((url, i) => {
            if (links[i]) response = response.replace(url, links[i])
        })

        return ctx.reply(response)
    } catch (error) {
        xlog.error(error)
        return ctx.reply('Có chút vấn đề không thể lấy được shortlink')

    }

})

bot.launch();