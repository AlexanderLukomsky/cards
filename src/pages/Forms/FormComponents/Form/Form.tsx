import React from "react"
import { useAppSelector } from "../../../../store/store"
import { validator, ValidatorErrorType } from "../../../../utils/validator"
import { Email } from "../Email/Email"
import { FormProgress } from "../FormProgress/FormProgress"
import { FormTitle } from "../FormTitle/FormTitle"
import { Password } from "../Password/Password"

export const Form: React.FC<PropsType> = React.memo(({
   onChangeEmailValue, onChangePassValue, onChangeConfirmPassValue, errorsHandler,
   email, password, confirmPassword, errors,
   title,
}) => {
   const authStatus = useAppSelector(state => state.auth.authStatus)
   //email handlers
   const onChangeEmailHandler = (value: string) => {
      onChangeEmailValue && onChangeEmailValue(value)
      errorsHandler({ ...errors, email: '' })
   }
   const emailValidate = () => {
      const error = validator({ email })
      errorsHandler({ ...errors, email: error.email })
   }
   //password handler
   const onChangePassHandler = (password: string) => {
      onChangePassValue && onChangePassValue(password)
      errorsHandler({ ...errors, password: '', confirmPassword: '' })
   }
   const passwordValidate = () => {
      const error = validator({ password, confirmPassword })
      errorsHandler({ ...errors, password: error.password, confirmPassword: error.confirmPassword })
   }
   //confirm password handler
   const onChangeConfirmPassHandler = (confirmPassword: string) => {
      onChangeConfirmPassValue && onChangeConfirmPassValue(confirmPassword)
      errorsHandler({ ...errors, confirmPassword: '' })
   }
   const confirmPasswordValidate = () => {
      const error = validator({ password, confirmPassword })
      errorsHandler({ ...errors, confirmPassword: error.confirmPassword })
   }
   return (
      <>
         {(authStatus === 'loading') && <FormProgress />}
         <FormTitle title={title} />
         {typeof email === 'string' && <Email value={email} error={errors.email} onChange={onChangeEmailHandler} onBlur={emailValidate} />}
         {typeof password === 'string' && <Password label="Password" value={password} error={errors.password} onChange={onChangePassHandler} onBlur={passwordValidate} />}
         {typeof confirmPassword === 'string' && <Password label="Confirm password" value={confirmPassword} error={errors.confirmPassword} onChange={onChangeConfirmPassHandler} onBlur={confirmPasswordValidate} />}
      </>
   )
})
type PropsType = {
   title: string
   email?: string
   password?: string
   confirmPassword?: string
   errors: ValidatorErrorType
   onChangeEmailValue?: (value: string) => void
   onChangePassValue?: (value: string) => void
   onChangeConfirmPassValue?: (value: string) => void
   errorsHandler: (errors: ValidatorErrorType) => void
}