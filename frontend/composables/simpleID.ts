export const simpleId = () => {
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    const charactersLength = 10
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
