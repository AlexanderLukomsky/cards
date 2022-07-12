import { Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "../pages/Error404";
import { Login } from "../pages/Login";
import { NewPassword } from "../pages/NewPassword";
import { PasswordRecovery } from "../pages/PasswordRecovery";
import { Profile } from "../pages/Profile";
import { Registration } from "../pages/Registration";
import { TestPage } from "../pages/TestPage";
const pagesPath = {
    LOGIN: '/login',
    ERROR404: '/404',
    NEW_PASS: '/new-pass',
    PASS_RECOVERY: '/pass-recovery',
    PROFILE: '/profile',
    REGISTRATION: '/registration'
}
export const AppRoutes = () => (

    <>
        <Routes>
            <Route path={pagesPath.ERROR404} element={<Error404 />} />
            <Route path={pagesPath.LOGIN} element={<Login />} />
            <Route path={pagesPath.NEW_PASS} element={<NewPassword />} />
            <Route path={pagesPath.PASS_RECOVERY} element={<PasswordRecovery />} />
            <Route path={pagesPath.PROFILE} element={<Profile />} />
            <Route path={pagesPath.REGISTRATION} element={<Registration />} />
            <Route path="/" element={<TestPage />} />
            <Route path="*" element={<Navigate to={'404'} />} />
        </Routes>
    </>
)