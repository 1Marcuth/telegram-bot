import * as telegraf from "telegraf"

import handleCommands from "./handlers/commands"
import handleEvents from "./handlers/events"
import { bot } from "./settings"

function createClient() {
    const client = new telegraf.Telegraf(bot.token)

    client.use(async (context, next) => {
        const start = new Date().getTime()
        await next()
        const responseInMilliseconds = new Date().getTime() - start
        console.log(`> [client] Telegram response time: ${responseInMilliseconds} ms.`)
    })

    async function useEventsHandler() {
        await handleEvents(client)
    }

    async function useCommandHandler() {
        await handleCommands(client)
    }

    async function start() {
        console.log("> [client] Starting...")
        
        await useEventsHandler()
        await useCommandHandler()
        
        client.launch()
            .then(_ => {
                console.log(`> [client] Successfully started as '${client.botInfo?.username}'.`)
            })
    }

    function stop() {
        console.log("> [client] Stoping...")

        client.stop()

        console.log("> [client] Stopped successfully!")
    }

    return { start, stop }
}

export default createClient