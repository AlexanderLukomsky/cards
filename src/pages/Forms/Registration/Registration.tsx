import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomButton } from "../../../Components/CustomButton"
import { registrationTC } from "../../../store/reducers/authReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { Email } from "../Components/Email"
import { Password } from "../Components/Password"
import { emailValidator, passwordValidator } from "../validators"
import './registration.scss';
export const Registration = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)
    const navigate = useNavigate()
    useEffect(() => {
        //  if (appStatus === 'success') { navigate(`/form/${formPath.LOGIN}`) }
    }, [appStatus, navigate])
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
                <CustomButton
                    className={"registration__button-back"} >
                    Home page
                </CustomButton>
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