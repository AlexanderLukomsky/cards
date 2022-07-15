export const passwordValidator = (passValue: string) => {
    if (passValue.length < 8) {
        return 'password cannot be less than 8 characters'
    }
    if (passValue.match(/^[A-Za-z0-9]{8,}$/) === null) {
        return 'invalid password format'
    }
    return ''
}
export const emailValidator = (emailValue: string) => {
    const emailPattern = /^[a-zA-Z0-9-._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    return !emailPattern.test(emailValue) ? 'invalid email format' : ''
}