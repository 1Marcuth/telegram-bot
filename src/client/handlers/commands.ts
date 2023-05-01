import { Telegraf } from "telegraf"
import path from "path"
import fs from "fs"

import CommandWrapper from "../utils/command/wrapper"

import ICommand from "../interfaces/command"

export default async (client: Telegraf) => {
    const commandsDirPath = path.join(__dirname, "../commands")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(commandsDirPath)
        .forEach(dir => {
            const subFolder = path.join(commandsDirPath, dir)
            fs.readdirSync(subFolder)
                .filter(file => file.endsWith(fileExtension))
                .forEach(async (file) => {
                    const commandFilePath = path.join(subFolder, file)
                    const command = await importCommand(commandFilePath)

                    if (!command) return

                    if (!command.name) {
                        throw new Error(`> [client-commands-handler-error] Not valid commmand name on '${commandFilePath}'.`)
                    }

                    if (!command.run) {
                        throw new Error(`> [client-commands-handler-error] Not valid command run on '${commandFilePath}'.`)
                    }

                    loadCommand(command)

                    function loadCommand(command: ICommand) {
                        const commandWrapper = new CommandWrapper(command)
                        client.command(commandWrapper.command.name, (context, next) => commandWrapper.run(context, next))

                        console.log(`> [client] The command '${command.name}' loaded.`)
                    }
                })
        })

    async function importCommand(commandFilePath: string) {
        const command: ICommand = (await import(commandFilePath)).command
        return command
    }
}