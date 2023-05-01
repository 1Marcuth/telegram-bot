import { Context } from "telegraf"
import { UpdateType } from "telegraf/typings/telegram-types"
import { Guard, MaybeArray } from "telegraf/typings/util"
import { Update } from "typegram"

enum EventTypes { on }
type IEventTypes = keyof typeof EventTypes
type IEventNames = MaybeArray<UpdateType | Guard<Update, Update>>
type Run = (context: Context) => Promise<any>

export default interface IEvent {
    type: IEventTypes
    name: IEventNames
    run: Run
}