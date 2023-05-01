import CommandOptionsStorage from "../utils/command/options/sorage"
import { Context } from "telegraf"

import IOption from "bot-command-options-parser/dist/interfaces/option"

export type INext = () => Promise<void>

type IRun = (context: Context, next: INext, options?: CommandOptionsStorage) => Promise<any>

export default interface ICommand {
    name: string
    description: string
    options?: IOption[]
    run: IRun
}