import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CustomButton } from "../../../Components/CustomButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { _formPath } from "../../_path/_formPath"
import { _pagesPath } from "../../_path/_pagesPath"
import { Email } from "../Components/Email"
import { Password } from "../Components/Password"
import { emailValidator, passwordValidator } from "../validators"
import './registration.scss';
import { registrationTC } from "./_registrationReducer/registrationReducer"
export const Registration = () => {
    const isReg = useAppSelector(state => state.registration.isReg)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const navigate = useNavigate()
    useEffect(() => {
        if (isReg) { navigate(`/form/${_formPath.LOGIN}`) }
    }, [isReg, navigate])
    const dispath = useAppDispatch()
    //state
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
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
    //confirm password handler
    const changeConfirmPassValue = (confirmPassword: string) => {
        setConfirmPasswordError('')
        setConfirmPassword(confirmPassword)
    }
    const confirmPasswordValidate = () => {
        let error = ''
        if (confirmPassword !== password) {
            error = 'Passwords do not match'
            setConfirmPasswordError(error)
        }
        return !error
    }
    const setRegistration = () => {
        const regData = {
            email,
            password
        }

        if (emailValidate() && confirmPasswordValidate() && passwordValidate()) {
            dispath(registrationTC(regData))
        }
    }
    return (
        <div className="registration">
            {(appStatus === 'loading') && <div className="registration-progress"><CircularProgress /></div>}
            <h3 className="registration__title">Sign Up</h3>
            <Email value={email} error={emailError} onChange={changeEmailValue} onBlur={emailValidate} />
            <Password label="Password" value={password} error={passwordError} onChange={changePassValue} onBlur={passwordValidate} />
            <Password label="Confirm password" value={confirmPassword} error={confirmPasswordError} onChange={changeConfirmPassValue} onBlur={confirmPasswordValidate} />
            <div className="registration__buttons">
                <NavLink className={"registration__button-back"}
                    to={_pagesPath.MAIN}
                >
                    Home page
                </NavLink>
                <CustomButton
                    onClick={setRegistration}
                    disabled={!!emailError || !!passwordError || !!confirmPasswordError || appStatus === 'loading'}
                    className={"registration__button-reg"} >
                    Register
                </CustomButton>
            </div>
        </div>
    )
}