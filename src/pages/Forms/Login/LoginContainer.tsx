import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../store/store"
import { Login } from "./Login"

export const LoginContainer = () => {
    const auth = useAppSelector(state => state.app.isAuth)
    const navigate = useNavigate()
    useEffect(() => { if (auth) { navigate('/profile') } }, [auth, navigate])
    return (
        <div className="login_container">
            <Login />
        </div>
    )
}