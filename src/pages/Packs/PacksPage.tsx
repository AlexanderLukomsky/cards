import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '../../Components/CustomSelect/CustomSelect'
import { Header } from '../../Components/Header/Header'
import { PaginationPacks } from './PaginationPacks/PaginationPacks'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { _pagesPath } from '../_path/_pagesPath'
import { Packs } from './Packs'
import './packsPage.scss'
import { SortPackCards } from './SortPackCards/SortPackCards'
import { setPacksStorage } from './utilsPacks/setPacksStorage'
import { getPacksTC } from '../../store/reducers/packsReducer'
import { PacksBarHeader } from './PacksBarHeader/PacksBarHeader'
import { PacksHeader } from './PacksHeader/PacksHeader'
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
        const packsStorageAsString = localStorage.getItem('packs')
        if (packsStorageAsString !== null) {
            const data = JSON.parse(packsStorageAsString)
            dispatch(getPacksTC({ ...data.packs }))
            return
        }
        dispatch(getPacksTC())
    }, [isAuth, navigate, dispatch])
    const pageCountHandler = (pageCount: number) => {
        dispatch(getPacksTC({ pageCount, page: 1 }))
        setPacksStorage({ pageCount, page: 1 })
    }
    return (
        <div className="packs_page container">
            <Header page='cards' />
            <div className='packs_page__columns'>
                <div className='packs_page__bar'>
                    <div className='packs_page__bar-header'>
                        <PacksBarHeader />
                    </div>
                    <div className='slider-wrapper'>
                        <SortPackCards />
                    </div>
                </div>
                <div className='packs-wrapper'>
                    <Packs isInitialized={packs.isInitialized} packs={packs.data.cardPacks} />
                    <div className='packs_page__footer'>
                        <PaginationPacks />
                        <div className='packs_page__footer-select'>
                            <CustomSelect items={[5, 10, 15]} value={packs.data.pageCount} onChange={pageCountHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}