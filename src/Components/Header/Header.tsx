import { NavLink, useLocation } from 'react-router-dom'
import { _pagesPath } from '../../pages/_path/_pagesPath'
import s from './header.module.scss'
export const Header = ({ page, ...props }: PropsType) => {
    return (
        <div className={s.header}>
            <div className={`${s.items} ${page === 'cards' ? s.active : ''}`}>
                <NavLink className={`${s.nav}`} to={_pagesPath.PACKS}>Packs list</NavLink>
            </div>
            <div className={`${s.items} ${page === 'profile' ? s.active : ''}`}>
                <NavLink className={s.nav} to={_pagesPath.PROFILE}>Profile</NavLink>
            </div>
        </div>
    )
}
type PropsType = {
    page: 'cards' | 'profile'
}