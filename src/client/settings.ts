import dotenv from "dotenv"

dotenv.config()

const bot = {
    name: "Marcuth's butler",
    prefix: "/",
    token: process.env.BOT_TOKEN as string,
    description: "Bot template made by Marcuth at https://github.com/1Marcuth",
    commands: {
        optionsSeparator: ":"
    }
}

export { bot }