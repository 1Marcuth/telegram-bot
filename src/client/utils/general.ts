function isValidBoolean(str: string) {
    return ["true", "false"].includes(str.toLowerCase())
}

function isValidNumeric(str: string) {
    return !isNaN(str as any)
}

function isValidNumericInteger(str: string) {
    if (!isValidNumeric(str)) return false
    if (!Number.isInteger(Number(str))) return false
    return true
}

function isValidNumericFloat(str: string) {
    if (!isValidNumeric(str)) return false
    if (Number.isInteger(Number(str))) return false
    return true
}

function isValidString(str: string) {
    if (!str) return false
    return true
}

export {
    isValidBoolean,
    isValidNumeric,
    isValidNumericFloat,
    isValidNumericInteger,
    isValidString
}