import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { setLogin } from "../../../App/reducers/authReducer"
import { CustomButton } from "../../../Components/CustomButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { validator, ValidatorErrorType } from "../../../utils/validator"
import { _formPath } from "../../Routes/_path/formPath"
import { Form } from "../FormComponents/Form/Form"
import './login.scss'
export const Login = React.memo(() => {
    const dispath = useAppDispatch()
    const authStatus = useAppSelector(state => state.auth.authStatus)
    //state
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [errors, setErrors] = useState<ValidatorErrorType>({ email: null, password: null, confirmPassword: null })
    const onSubmitForm = () => {
        const errors = validator({ email: emailValue, password: passwordValue })
        if (errors.email || errors.password) {
            setErrors(errors)
            return
        }
        const data = {
            email: emailValue,
            password: passwordValue,
            rememberMe: true
        }
        dispath(setLogin(data))
    }
    return (
        <div className="login forms-form">
            <Form
                title="Sign In"
                errorsHandler={setErrors}
                errors={errors}
                email={emailValue}
                password={passwordValue}
                onChangeEmailValue={setEmailValue}
                onChangePassValue={setPasswordValue}

            />
            <NavLink
                to={`${_formPath.FORM}${_formPath.PASS_RECOVERY}`}
                className={"login__pass-recovery-link"} >
                Forgot Password
            </NavLink>
            <CustomButton
                onClick={onSubmitForm}
                disabled={!!errors.email || !!errors.password || authStatus === 'loading'}
                className={"forms__submit-form"} >
                Login
            </CustomButton>
            <NavLink to={`${_formPath.FORM}${_formPath.REGISTRATION}`} className={"login__reg-link"}>Sign Up</NavLink>
        </div>
    )
})