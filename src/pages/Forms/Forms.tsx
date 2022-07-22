import { Navigate, Route, Routes } from "react-router-dom";
import { Error404 } from "../Error404";
import { NewPassword } from "../NewPassword";
import { PasswordRecovery } from "../PasswordRecovery";
import { Registration } from "./Registration/Registration";
import "./form.scss";
import { LoginContainer } from "./Login/LoginContainer";
import { _formPath } from "../_path/_formPath";
export const Forms = () => (
    < div className="form" >
        <div className="form__container">
            <Routes>
                <Route path={_formPath.LOGIN} element={<LoginContainer />} />
                <Route path={_formPath.REGISTRATION} element={<Registration />} />
                <Route path={_formPath.PASS_RECOVERY} element={<PasswordRecovery />} />
                <Route path={_formPath.NEW_PASS} element={<NewPassword />} />
                <Route path="*" element={<Navigate to={'404'} />} />
                <Route path="/" element={<div></div>} />
                <Route path={_formPath.ERROR404} element={<Error404 />} />
            </Routes>
        </div>
    </div >

)