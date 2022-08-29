import { NavLink, useLocation } from "react-router-dom"
import { _pagesPath } from "../../pages/Routes/_path/pagesPath"
import "./header.scss"
export const Header = () => {
   const { pathname } = useLocation()
   return (
      <div className="header">
         <ul className="header__list">
            <li className={`header__item${pathname === _pagesPath.PACKS ? ' active' : ''}`}>
               <NavLink to={_pagesPath.PACKS}>Packs list</NavLink>
            </li>
            <li className={`header__item${pathname === _pagesPath.PROFILE ? ' active' : ''}`}>
               <NavLink to={_pagesPath.PROFILE}>Profile</NavLink>
            </li>
         </ul>
      </div>
   )
}