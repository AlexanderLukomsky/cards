import { Navigate, Route, Routes } from "react-router-dom";
import { CardsPage } from "../../pages/Cards/CardsPage";
import { Error404 } from "../../pages/Error404";
import { Forms } from "../../pages/Forms/Forms";
import { MainPage } from "../../pages/Main/MainPage";
import { PacksPage } from "../../pages/Packs/PacksPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { _pagesPath } from "../../pages/_path/_pagesPath";
export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={_pagesPath.MAIN} element={<MainPage />} />
                <Route path="/" element={<Navigate to={_pagesPath.MAIN} />} />

                <Route path={_pagesPath.PROFILE} element={<ProfilePage />} />
                <Route path={_pagesPath.PACKS} element={<PacksPage />} />
                <Route path={_pagesPath.CARDS} element={<CardsPage />} />
                <Route path={_pagesPath.FORM} element={<Forms />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}