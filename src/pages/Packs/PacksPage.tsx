import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '../../Components/CustomSelect/CustomSelect'
import { Header } from '../../Components/Header/Header'
import { PaginationPacks } from './PaginationPacks/PaginationPacks'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { _pagesPath } from '../_path/_pagesPath'
import { Packs } from './Packs'
import './stylesPacks/packsPage.scss'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { getPacksTC, setIsInitializedPacksAC, setPageCountAC } from './_packsReducer/packsReducer'
import { PacksBar } from './PacksBar/PacksBar'
export const PacksPage = React.memo(() => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const packs = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate(_pagesPath.MAIN)
            return
        }
        if (packs.updatedPacks.updateStatus === 'failed') { return }
        dispatch(getPacksTC())
        return () => { dispatch(setIsInitializedPacksAC({ isInitialized: false })) }
    }, [isAuth, navigate, dispatch, packs.updatedPacks, packs.requestParams])
    const pageCountHandler = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    return (
        <div className="packs_page container">
            <Header page='cards' />
            <div className='packs_page__columns'>
                <PacksBar />
                <div className='packs-wrapper'>
                    <PacksHeader />
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
})