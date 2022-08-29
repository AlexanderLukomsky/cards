import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/store"
import { FormRoutes } from "../Routes/FormRoutes"
import { _pagesPath } from "../Routes/_path/pagesPath"
import "./form.scss"
export const Forms = () => {
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.auth.isAuth)
   useEffect(() => { if (isAuth) { navigate(_pagesPath.PACKS) } }, [isAuth, navigate])
   return (
      <div className="forms">
         <div className="forms__container">
            <FormRoutes />
         </div>
      </div>
   )
}