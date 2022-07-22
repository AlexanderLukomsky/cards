import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../Components/Header/Header'
import { getPacksTC } from '../../store/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { _pagesPath } from '../_path/_pagesPath'
import { Packs } from './Packs'
import './packsPage.scss'
export const PacksPage = () => {
    const isAuth = useAppSelector(state => state.app.isAuth)
    const packs = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate(_pagesPath.MAIN)
            return
        }
        dispatch(getPacksTC())
    }, [isAuth, navigate, dispatch])
    return (
        <div className="packs_page container">
            <Header page='cards' />
            <div className='packs_page__packs'>
                <div>
                    <div></div>
                    <div> show packs cards</div>
                    <div>profile</div>
                    <div>pag card number</div>
                </div>
                <Packs isInitialized={packs.isInitialized} packs={packs.cardsPack} />
            </div>
        </div>
    )
}