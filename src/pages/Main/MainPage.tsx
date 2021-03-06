import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { pagesPath } from "../../Components/Routes/AppRoutes";
import { Login } from "../Forms/Login/Login";
import { formPath } from "../Forms/path/form-path"
import './mainPage.scss'

export const MainPage = () => {
    const [btnStyle, setBtnStyle] = useState<' base' | ' intervalColor'>(' base')
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
            <div> <NavLink to='/cards/cards'>CARDS</NavLink></div>
            <div> <NavLink to='/profile'>Profile</NavLink></div>
            <div> <NavLink to={`/form/${formPath.LOGIN}`}>FORM LOGIN</NavLink></div>
            <div className="main">
                <div className="main__columns container">
                    <div className="main__column_nav">
                        <div className={`main__reg-btn${btnStyle}`}> <NavLink to={`/form/${formPath.REGISTRATION}`}>REGISTRATION</NavLink></div>
                    </div>
                    <div className="main__column_login">
                        <Login />
                    </div>
                </div>
            </div>
        </div>

    )
}