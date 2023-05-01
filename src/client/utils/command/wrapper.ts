import CommandOptionsParser from "bot-command-options-parser/dist"
import * as telegraf from "telegraf"

import CommandOptionsStorage from "./options/sorage"

import IValidateResult from "bot-command-options-parser/dist/interfaces/validate-result"
import ICommand, { INext } from "../../interfaces/command"
import { extractCommandAndOptions } from "../message/content"

class CommandWrapper {
    public command: ICommand

    constructor(command: ICommand) {
        this.command = command
    }

    public async run(context: telegraf.Context, next: INext) {
        const messageContent = (context.message as any).text as string
        const stringOptions = extractCommandAndOptions(messageContent).options

        if (this.command.options) {
            const optionsParser = new CommandOptionsParser(this.command.options)
            let optionsValidateResult: IValidateResult[]
            
            if (stringOptions.length > 0) {
                optionsValidateResult = optionsParser.validateOptions(stringOptions)

                let optionsError: any[] = []
                
                optionsValidateResult.forEach((option, i) => {
                    if (!option.isValid.value) optionsError.push({ i, ...option })
                })

                if (optionsError.length > 0) {
                    const optionsErrorMessage = "<code>Erro de argumentos:</code>\n\n" + optionsError.map((option) => {
                        const commandOption = this.command.options?.find(opt => opt.name === option.name)
                        return `<code>- ${option.i + 1} : ${option.name} [${option.type}]</code> | <b><i>${commandOption?.description}</i></b>\n`
                    }).join("")

                    return await context.replyWithHTML(optionsErrorMessage)
                }

                const optionsStorage = new CommandOptionsStorage(optionsValidateResult)

                return await this.command.run(context, next, optionsStorage)
            } else {
                const optionsMenu = this.command.options.map((option, i) => `- ${i + 1} : <code>${option.name} [${option.type}]</code> | <b><i>${option.description}</i></b>\n`).join("")

                return await context.replyWithHTML(`<code>Envie os argumentos:</code>\n\n${optionsMenu}`)
            }
        }
        
        return await this.command.run(context, next)
    }
}

export default CommandWrapper