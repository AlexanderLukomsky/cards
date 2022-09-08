import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/store";
import { Login } from "../Forms/Login/Login";
import { _formPath } from "../Routes/_path/formPath";
import { _pagesPath } from "../Routes/_path/pagesPath";
import './main.scss'
export const Main = () => {
   const [btnStyle, setBtnStyle] = useState<' base' | ' intervalColor'>(' base')
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.auth.isAuth)
   useEffect(() => {
      if (isAuth) { navigate(_pagesPath.PACKS) }
   }, [isAuth, navigate])
   useEffect(() => {
      const id = setInterval(() => {
         if (btnStyle === ' base') {
            setBtnStyle(' intervalColor')
         } else {
            setBtnStyle(' base')
         }
      }, 1300)
      return () => {
         clearInterval(id)
      }
   }, [btnStyle])
   return (
      <div>
         <div className="main">
            <div className="main__columns container">
               <div className="main__column">
                  <div className={`main__reg-btn${btnStyle}`}>
                     <NavLink to={`${_formPath.FORM}${_formPath.REGISTRATION}`}>REGISTRATION</NavLink>
                  </div>
               </div>
               <div className="main__column-login">
                  <Login />
               </div>
            </div>
         </div>
      </div>

   )
}