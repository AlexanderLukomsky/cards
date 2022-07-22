import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/store";
import { Login } from "../Forms/Login/Login";
import { _formPath } from "../_path/_formPath";
import { _pagesPath } from "../_path/_pagesPath";
import './mainPage.scss'

export const MainPage = () => {
    const [btnStyle, setBtnStyle] = useState<' base' | ' intervalColor'>(' base')
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.app.isAuth)
    useEffect(() => {
        if (isAuth) { navigate(_pagesPath.PROFILE) }
    }, [isAuth, navigate])
    useEffect(() => {
        const id = setInterval(() => {
            if (btnStyle === ' base') {
                setBtnStyle(' intervalColor')
            } else {
                setBtnStyle(' base')
            }
        }, 1300)

        return () => {
            clearInterval(id)
        }
    }, [btnStyle])
    return (
        <div>
            <div> <NavLink to={_pagesPath.PACKS}>PACKS</NavLink></div>
            <div> <NavLink to={_pagesPath.PROFILE}>Profile</NavLink></div>
            <div> <NavLink to={`/form/${_formPath.LOGIN}`}>FORM LOGIN</NavLink></div>
            <div className="main">
                <div className="main__columns container">
                    <div className="main__column_nav">
                        <div className={`main__reg-btn${btnStyle}`}> <NavLink to={`/form/${_formPath.REGISTRATION}`}>REGISTRATION</NavLink></div>
                    </div>
                    <div className="main__column_login">
                        <Login />
                    </div>
                </div>
            </div>
        </div>

    )
}