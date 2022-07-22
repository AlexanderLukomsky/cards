import { CircularProgress } from "@mui/material"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { CustomButton } from "../../../Components/CustomButton"
import { loginTC } from "../../../store/reducers/authReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { _formPath } from "../../_path/_formPath"
import { Email } from "../Components/Email"
import { Password } from "../Components/Password"
import { emailValidator, passwordValidator } from "../validators"
import './login.scss'
export const Login = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)
    const dispath = useAppDispatch()
    //state
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    //email handlers
    const changeEmailValue = (email: string) => {
        setEmailError('')
        setEmail(email)
    }
    const emailValidate = () => {
        const error = emailValidator(email)
        setEmailError(error)
        return !error
    }
    //password handler
    const changePassValue = (password: string) => {
        setPasswordError('')
        setPassword(password)
    }
    const passwordValidate = () => {
        const error = passwordValidator(password)
        setPasswordError(error)
        return !error
    }
    const setLogin = () => {
        if (emailValidate() && passwordValidate()) {
            const data = {
                email,
                password,
                rememberMe: true
            }
            dispath(loginTC(data))
        }

    }
    return (
        <div className="login">
            {(appStatus === 'loading') && <div className="login-progress"><CircularProgress /></div>}
            <h3 className="login__title">Sign In</h3>
            <Email value={email} error={emailError} onChange={changeEmailValue} onBlur={emailValidate} />
            <Password label="Password" value={password} error={passwordError} onChange={changePassValue} onBlur={passwordValidate} />
            <NavLink
                to={`/form/${_formPath.PASS_RECOVERY}`}
                className={"login__link-pass_recovery"} >
                Forgot Password
            </NavLink>
            <CustomButton
                onClick={setLogin}
                disabled={!!emailError || !!passwordError || appStatus === 'loading'}
                className={"login__button-login"} >
                Login
            </CustomButton>
            <NavLink to='/' className={"login__link-info"} >Don’t have an account?</NavLink>
            <NavLink to={`/form/${_formPath.REGISTRATION}`} className={"login__link-registration"}>Sign Up</NavLink>
        </div>
    )
}