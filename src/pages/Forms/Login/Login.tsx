import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CustomButton } from "../../../Components/CustomButton"
import { loginTC } from "../../../store/reducers/authReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { Email } from "../Components/Email"
import { Password } from "../Components/Password"
import { formPath } from "../path/form-path"
import { emailValidator, passwordValidator } from "../validators"

export const Login = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)
    const auth = useAppSelector(state => state.app.isAuth)
    const navigate = useNavigate()
    useEffect(() => { if (auth) { navigate('/profile') } }, [auth, navigate])
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
        <div className="form__item login">
            {(appStatus === 'loading') && <div className="form-progress"><CircularProgress /></div>}
            <h3 className="form__title">Sign In</h3>
            <Email value={email} error={emailError} onChange={changeEmailValue} onBlur={emailValidate} />
            <Password label="Password" value={password} error={passwordError} onChange={changePassValue} onBlur={passwordValidate} />
            <NavLink
                to={`/form/${formPath.PASS_RECOVERY}`}
                className={"form__link-pass_recovery"} >
                Forgot Password
            </NavLink>
            <CustomButton
                onClick={setLogin}
                disabled={!!emailError || !!passwordError || appStatus === 'loading'}
                className={"form__button-login"} >
                Login
            </CustomButton>
            <NavLink to='/' className={"form__link-info"} >Don’t have an account?</NavLink>
            <NavLink to={`/form/${formPath.REGISTRATION}`} className={"form__link-registration"}>Sign Up</NavLink>
        </div>
    )
}