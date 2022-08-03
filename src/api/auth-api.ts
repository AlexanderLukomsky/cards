import { _instance } from "./instance"
export const authAPI = {
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
    },
    update(model: UpdateModelType) {
        return _instance.put<{ updatedUser: loginResponseType }>('/auth/me', model)
    }
}
type loginResponseType = {
    created: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    tokenDeathTime: number,
    updated: string,
    verified: boolean,
    __v: number,
    _id: string,
    avatar?: string
}

export type UpdateModelType = {
    name?: string,
    avatar?: string
}
export type authDataType = {
    email: string,
    password: string,
    rememberMe?: boolean
}