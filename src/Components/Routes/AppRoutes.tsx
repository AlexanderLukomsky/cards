import { Navigate, Route, Routes } from "react-router-dom";
import { Cards } from "../../pages/Cards/Cards";
import { Error404 } from "../../pages/Error404";
import { Forms } from "../../pages/Forms/Forms";
import { MainPage } from "../../pages/Main/MainPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
export const pagesPath = {
    FORM: '/form/*',
    ERROR404: '/404',
    PROFILE: '/profile',
    CARDS: '/cards/cards',
    MAIN: '/cards'
}
export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={pagesPath.ERROR404} element={<Error404 />} />
                <Route path={pagesPath.FORM} element={<Forms />} />
                <Route path={pagesPath.PROFILE} element={<ProfilePage />} />
                <Route path={pagesPath.MAIN} element={<MainPage />} />
                <Route path="*" element={<Navigate to={'404'} />} />
                <Route path="/" element={<Navigate to={pagesPath.MAIN} />} />
                <Route path={pagesPath.CARDS} element={<Cards />} />
            </Routes>
        </>
    )
}