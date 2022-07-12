import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "../../../pages/Error404";
import { Login } from "../../../pages/Login";
import { NewPassword } from "../../../pages/NewPassword";
import { PasswordRecovery } from "../../../pages/PasswordRecovery";
import { Registration } from "../../../pages/Registration";
import "./form.scss";
const formPath = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PASS_RECOVERY: '/recovery-password',
    NEW_PASS: '/new-password',
    ERROR404: '404'
}
export const Form = () => (
    <div className="form">
        <Container maxWidth="xs" fixed>
            <Routes>
                <Route path={formPath.LOGIN} element={<Login />} />
                <Route path={formPath.REGISTRATION} element={<Registration />} />
                <Route path={formPath.PASS_RECOVERY} element={<PasswordRecovery />} />
                <Route path={formPath.NEW_PASS} element={<NewPassword />} />
                <Route path="*" element={<Navigate to={'404'} />} />
                <Route path="/" element={<div></div>} />
                <Route path={formPath.ERROR404} element={<Error404 />} />
            </Routes>
        </Container>
    </div>

)