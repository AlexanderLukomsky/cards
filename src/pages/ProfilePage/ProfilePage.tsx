import { NavLink } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { _pagesPath } from "../_path/_pagesPath"
import { Profile } from "./Profile/Profile"
import './profilePage.scss'
export const ProfilePage = () => {
    return (
        <div className="profile_page">
            <Header page="profile" />
            <div className="profile_page__container container">
                <Profile />
            </div>
            <NavLink to={_pagesPath.PACKS} >PACKS</NavLink>
        </div>
    )
}