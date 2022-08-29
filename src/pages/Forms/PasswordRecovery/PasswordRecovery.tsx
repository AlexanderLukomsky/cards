import { useState } from "react"
import { NavLink } from "react-router-dom"
import { CustomButton } from "../../../Components/CustomButton"
import { useAppSelector } from "../../../store/store"
import { validator, ValidatorErrorType } from "../../../utils/validator"
import { _formPath } from "../../Routes/_path/formPath"
import { Form } from "../FormComponents/Form/Form"
import "./passwordRecovery.scss"
export const PasswordRecovery = () => {
   const authStatus = useAppSelector(state => state.auth.authStatus)
   const [emailValue, setEmailValue] = useState<string>('')
   const [errors, setErrors] = useState<ValidatorErrorType>({ email: null, password: null, confirmPassword: null })
   const onSubmitForm = () => {
      const errors = validator({ email: emailValue })
      if (errors.email || errors.password) {
         setErrors(errors)
         return
      }
      const data = {
         email: emailValue,
         rememberMe: true
      }
   }
   return (
      <div className="password-recovery forms-form">
         <Form
            title="Forgot your password?"
            errors={errors}
            errorsHandler={setErrors}
            email={emailValue}
            onChangeEmailValue={setEmailValue}
         />
         <span className="password-recovery__text">Enter your email address and we will send you further instructions </span>
         <CustomButton
            onClick={onSubmitForm}
            disabled={!!errors.email || authStatus === 'loading'}
            className={"forms__submit-form"} >
            Send Instructions
         </CustomButton>
         <span className="password-recovery__text">Did you remember your password?</span>
         <NavLink className="password-recovery__link" to={`${_formPath.FORM}${_formPath.LOGIN}`}>Try logging in</NavLink>
      </div>
   )
}