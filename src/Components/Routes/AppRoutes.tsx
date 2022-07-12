import { Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "../../pages/Error404";
import { Form } from "./FormRoutes/FormRoutes";
import { Profile } from "../../pages/Profile";
import { TestPage } from "../../pages/TestPage";
const pagesPath = {
    FORM: '/form/*',
    ERROR404: '/404',
    PROFILE: '/profile',
}
export const AppRoutes = () => (
    <>
        <Routes>
            <Route path={pagesPath.ERROR404} element={<Error404 />} />
            <Route path={pagesPath.FORM} element={<Form />} />
            <Route path={pagesPath.PROFILE} element={<Profile />} />
            <Route path="/" element={<TestPage />} />
            <Route path="*" element={<Navigate to={'404'} />} />
        </Routes>
    </>
)