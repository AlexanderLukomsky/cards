import { Navigate } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { useAppSelector } from "../../store/store"
import { _pagesPath } from "../Routes/_path/pagesPath"
import "./profile.scss"
import { ProfileBar } from "./ProfileBar/ProfileBar"
import { ProfilePacks } from "./ProfilePacks/ProfilePacks"
export const Profile = () => {
   const isAuth = useAppSelector(state => state.auth.isAuth)
   if (!isAuth) return <Navigate to={_pagesPath.MAIN} />
   return (
      <div className="profile">
         <div className="container">
            <Header />
            <div className="profile__columns">
               <ProfileBar />
               <ProfilePacks />
            </div>
         </div>
      </div>
   )
}