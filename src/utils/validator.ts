export const validator = (data: ValidatorDataType): ValidatorErrorType => {
   const { email, password, confirmPassword } = data
   const error: ValidatorErrorType = { email: null, password: null, confirmPassword: null }
   if (email !== undefined) {
      const emailPattern = /^[a-zA-Z0-9-._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
      error.email = !emailPattern.test(email) ? 'invalid email format' : null
   }
   if (password !== undefined) {
      const passwordPatern = /^[A-Za-z0-9]{1,}$/
      if (!passwordPatern.test(password) && password.length > 0) {
         error.password = 'invalid password format'
      } else if (password.length < 8) {
         error.password = 'password cannot be less than 8 characters'
      }
   }
   if (confirmPassword !== undefined) {
      if (confirmPassword !== password) {
         error.confirmPassword = 'Passwords do not match'
      }
   }
   return error
}

type ValidatorDataType = {
   email?: string
   password?: string
   confirmPassword?: string
}
export type ValidatorErrorType = {
   email: string | null
   password: string | null
   confirmPassword: string | null
}