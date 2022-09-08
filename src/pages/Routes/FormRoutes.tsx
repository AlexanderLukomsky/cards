import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../Forms/Login/Login"
import { NewPassword } from "../Forms/NewPassword/NewPassword"
import { ForgotPassword } from "../Forms/ForgotPassword/ForgotPassword"
import { Registration } from "../Forms/Registration/Registration"
import { _formPath } from "./_path/formPath"
import { _pagesPath } from "./_path/pagesPath"

export const FormRoutes = () => {
   return (
      <>
         <Routes>
            <Route path={_formPath.LOGIN} element={<Login />} />
            <Route path={_formPath.REGISTRATION} element={<Registration />} />
            <Route path={_formPath.FORGOT_PASS} element={<ForgotPassword />} />
            <Route path={_formPath.NEW_PASS} element={<NewPassword />} />
            <Route path={'/'} element={<Navigate to={_pagesPath.MAIN} />} />
            <Route path={'*'} element={<Navigate to={_pagesPath.MAIN} />} />
         </Routes>
      </>
   )
}