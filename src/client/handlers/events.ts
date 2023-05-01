import { Telegraf } from "telegraf"
import path from "path"
import fs from "fs"

import IEvent from "../interfaces/event"

export default async (client: Telegraf) => {
    const eventsDirPath = path.join(__dirname, "../events")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(eventsDirPath)
        .filter(file => file.endsWith(fileExtension))
        .forEach(async (file) => {
            const eventFilePath = path.join(eventsDirPath, file)
            const event = await importEvent(eventFilePath)

            if (event.type === "on") {
                loadOnEvent(event)
    
            } else {
                throw new Error(`> [client-error] The value '${event.type}' that informed for the type of the event is invalid.`)
            }

            function loadOnEvent(event: IEvent) {
                client.on(event.name, (context) => event.run(context))

                console.log(`> [client] The event '${event.name}' loaded.`)
            }
        })

    async function importEvent(eventFilePath: string) {
        const event: IEvent  = (await import(eventFilePath)).event
        return event
    }
}