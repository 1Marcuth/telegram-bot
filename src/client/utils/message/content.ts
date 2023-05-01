import { bot } from "../../settings"

function extractCommandAndOptions(messageContent: string) {
    if (!messageContent) return { command: "", options: [] }

    let [command, ...options] = messageContent
        .slice(bot.prefix.length)
        .trim()
        .split(bot.commands.optionsSeparator)

    command = command.toLocaleLowerCase()
    options = parseOptions(options)

    return {
        command,
        options
    }

    function parseOptions(options: string[]) {
        options = options
            .map(option => option.trim())
            .filter(option => option !== "")

        return options
    }
}

export { extractCommandAndOptions }