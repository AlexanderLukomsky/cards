import { NavLink } from "react-router-dom"
import { _pagesPath } from "./_path/_pagesPath"

export const Error404 = () => {
    return (
        <div>
            Error404
            <NavLink to={_pagesPath.MAIN}>GO HOME</NavLink>
        </div>
    )
}