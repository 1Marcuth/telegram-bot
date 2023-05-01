interface IField {
    name: string
    value: string
}

interface IAuthor {
    name: string
    emoji: string
}

interface IFooter {
    text: string
    emoji: string
}

type ITimestamp = Date | undefined

class Embed {
    private author: string = ""
    private title: string = ""
    private description: string = ""
    private fields: string = ""
    private timestamp: string = ""
    private footer: string = ""

    public constructor(
        author?: IAuthor,
        title?: string,
        fields?: IField[],
        description?: string,
        timestamp?: ITimestamp,
        footer?: IFooter
    ) {
        if (author) this.setAuthor(author)
        if (title) this.setTitle(title)
        if (description) this.setDescription(description)
        if (fields) this.setFields(fields)
        if (timestamp) this.setTimestamp(timestamp)
        if (footer) this.setFooter(footer)
    }

    public setAuthor(author: IAuthor) {
        this.author = `<b>${author.emoji} ${author.name}</b>`
        return this
    }

    public setTitle(title: string) {
        this.title = `<b>${title}</b>`
        return this
    }

    public setDescription(description: string) {
        this.description = description
        return this
    }

    public setFields(fields: IField[]) {
        this.fields = fields.map(field => {
            return `<b>${field.name}:</b>\n${field.value}\n`
        }).join("")
        return this
    }

    public setTimestamp(timestamp: ITimestamp) {
        const date = timestamp?.toLocaleDateString("pt-br") ?? new Date().toLocaleDateString("pt-br")
        const time = timestamp?.toLocaleTimeString("pt-br") ?? new Date().toLocaleTimeString("pt-br")
        this.timestamp = `<i>${date}, ${time}</i>`
        return this
    }

    public setFooter(footer: IFooter) {
        this.footer = `<b><i>${footer.emoji} ${footer.text}</i></b>`
        return this
    }

    public buildMessageText() {
        let message = ""

        if (this.author) message += `${this.author}\n\n`
        if (this.title)  message += `${this.title}\n\n`
        if (this.description) message += `${this.description}\n\n`
        if (this.fields) message += `${this.fields}\n\n`
        if (this.footer) {
            if (this.timestamp) {
                if (this.timestamp) message += `${this.footer} | ${this.timestamp}`
            }

            else message += this.footer
        } else if (this.timestamp) message += this.timestamp

        message = message.trim()
        
        return message
    }
}

export default Embed