import { bot } from "../../settings"
import Embed from "../../utils/message/embed"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "ping",
    description: "Envia o ping/latência do bot",
    run: async (context, next) => {
        const startTime = new Date().getTime()

        await next()

        const endTime = new Date().getTime()

        const ping = endTime - startTime

        const pingEmbed = new Embed()
            .setAuthor({ name: bot.name, emoji: "🤖" })
            .setTitle("Ping Bot")
            .setDescription(`Olá @${context.from?.username}, meu ping está em <code>${ping} ms</code>`)
            .setTimestamp(new Date())
            .setFooter({ text: "By Marcuth", emoji: "👨‍💻" })

        await context.replyWithHTML(pingEmbed.buildMessageText())
    }
}