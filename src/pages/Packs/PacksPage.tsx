import { Pagination, Slider } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '../../Components/CustomSelect/CustomSelect'
import { Header } from '../../Components/Header/Header'
import { changeMinMaxCardsValueAC, getPacksTC } from '../../store/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { _pagesPath } from '../_path/_pagesPath'
import { Packs } from './Packs'
import './packsPage.scss'
export const PacksPage = () => {
    const isAuth = useAppSelector(state => state.app.isAuth)
    const packs = useAppSelector(state => state.packs)
    const pageTotalCount = Math.ceil(packs.data.cardPacksTotalCount / packs.data.pageCount)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate(_pagesPath.MAIN)
            return
        }
        const packsStorageSettings = localStorage.getItem('packs')
        if (typeof packsStorageSettings === 'string') {
            const packsSettings = JSON.parse(packsStorageSettings)
            dispatch(getPacksTC({ ...packsSettings.data }))
            console.log(packsSettings);
            if (packsSettings.data.min && packsSettings.data.max) {
                setMinMax([packsSettings.data.min, packsSettings.data.max])
            }
            return
        }
        dispatch(getPacksTC())
    }, [isAuth, navigate, dispatch])
    const setLocalStorageParams = (params: any) => {
        const data = {
            page: packs.data.page,
            pageCount: packs.data.pageCount,
            min: packs.params.minCards,
            max: packs.params.maxCards,
            ...params
        }
        localStorage.setItem('packs', JSON.stringify({ data }))
    }
    const changePacksPageCount = (pageCount: number) => {
        dispatch(getPacksTC({ pageCount }))
        setLocalStorageParams({ pageCount })
    }
    const changePage = (e: any, page: number) => {
        dispatch(getPacksTC({ page }))
        setLocalStorageParams({ page })
    }
    //**slider */

    const [minMax, setMinMax] = useState<number[]>([packs.params.minCards, packs.params.maxCards])
    const changeMinMaxCardsValue = (event: Event, values: number | number[]) => {
        setMinMax(values as number[])
    };
    const sortByCardsNumber = (min: number, max: number) => {
        const sortValues = { min, max }
        dispatch(getPacksTC(sortValues))
        dispatch(changeMinMaxCardsValueAC(sortValues))
        setLocalStorageParams(sortValues)
    }


    //*slider end
    return (
        <div className="packs_page container">
            <Header page='cards' />
            <div className='packs_page__columns'>
                <div className='packs_page__bar'>
                    <div>
                        <div><button>MY</button></div>
                        <div><button>ALL</button></div>
                    </div>
                    <div> show packs cards
                        <div className='slider-wrapper'>
                            <Slider
                                value={minMax}
                                onChange={changeMinMaxCardsValue}
                                onMouseUp={() => sortByCardsNumber(minMax[0], minMax[1])}
                                color="secondary"
                                size='medium'
                                valueLabelDisplay="on"
                                min={packs.data.minCardsCount}
                                max={packs.data.maxCardsCount}
                            />
                        </div>
                    </div>
                    <div>profile</div>
                    <div>pag card number</div>
                </div>
                <div className='packs-wrapper'>
                    <Packs isInitialized={packs.isInitialized} packs={packs.data.cardPacks} />
                    <CustomSelect pageCount={packs.data.pageCount} onChange={changePacksPageCount} />
                    <Pagination page={packs.data.page} onChange={changePage} count={pageTotalCount} showFirstButton showLastButton />
                </div>
            </div>
        </div>
    )
}