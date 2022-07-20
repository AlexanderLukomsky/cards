import { Profile } from "./Profile/Profile"
import './profilePage.scss'
export const ProfilePage = () => {
    return (
        <div className="profile_page">
            <div className="profile_page__container container">
                <Profile />
            </div>
        </div>
    )
}