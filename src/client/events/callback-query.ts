import IEvent from "../interfaces/event"

export const event: IEvent = {
    name: "callback_query",
    type: "on",
    run: async (context) => {
        console.log(context.callbackQuery)
    }
}