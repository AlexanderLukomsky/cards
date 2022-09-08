import { _instance } from "./instance"

export const authAPI = {
   auth(data: AuthDataType) {
      return _instance.post<LoginResponseType>('auth/login', data)
   },
   authMe() {
      return _instance.post<LoginResponseType>('/auth/me', {})
   },
   logout() {
      return _instance.delete('/auth/me', {})
   },
   registration(data: RegisterDataType) {
      return _instance.post('/auth/register', data)
   },
   updateUser(data: EditProfileDataType) {
      return _instance.put<UpdateUserType>('/auth/me', data)
   },
   forgotPassword(data: ForgotPasswordDataType) {
      return _instance.post<UpdateUserType>('/auth/forgot', data)
   },
   newPassword(data: NewPasswordDataType) {
      return _instance.post<UpdateUserType>('/auth/set-new-password', data)
   }
}
export type LoginResponseType = {
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
export type UpdateUserType = {
   token: string
   tokenDeathTime: number
   updatedUser: LoginResponseType
}
export type AuthDataType = RegisterDataType & {
   rememberMe?: boolean
}
export type RegisterDataType = {
   email: string
   password: string
}
export type EditProfileDataType = {
   name: string
   avatar?: string
}
export type ForgotPasswordDataType = {
   email: string
   from: string
   message: string
}
export type NewPasswordDataType = {
   password: string
   resetPasswordToken: string
}