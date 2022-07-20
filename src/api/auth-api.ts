import { _instance } from "./instance"

export const authApi = {
    auth(data: authDataType) {
        return _instance.post<loginResponseType>('auth/login', data)
    },
    registration(data: authDataType) {
        return _instance.post('/auth/register', data)
    },
    authMe() {
        return _instance.post('/auth/me', {})
    },
    logout() {
        return _instance.delete('/auth/me', {})
    }
}
type loginResponseType = {
    created: '',
    email: "",
    isAdmin: false,
    name: "",
    publicCardPacksCount: 0,
    rememberMe: false,
    token: "",
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: "",
    avatar?: string
}


export type authDataType = {
    email: string,
    password: string,
    rememberMe?: boolean
}