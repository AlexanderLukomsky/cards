export const modalsValidation = (value: string) => {
    const trimValue = value.trim()
    if (!trimValue) {
        return false
    }
    return true
}