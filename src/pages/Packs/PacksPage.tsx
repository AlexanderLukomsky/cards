import { Pagination, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomSelect } from '../../Components/CustomSelect/CustomSelect'
import { Header } from '../../Components/Header/Header'
import { getPacksTC } from '../../store/reducers/packsReducer'
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
            dispatch(getPacksTC({ ...packsSettings }))
            return
        }
        dispatch(getPacksTC())
    }, [isAuth, navigate, dispatch])
    const changePacksPageCount = (pageCount: number) => {
        const page = packs.data.page
        localStorage.setItem('packs', JSON.stringify({ pageCount, page }))
        dispatch(getPacksTC({ pageCount }))
    }
    const changePage = (e: any, page: number) => {
        const pageCount = packs.data.pageCount
        localStorage.setItem('packs', JSON.stringify({ pageCount, page }))
        dispatch(getPacksTC({ page }))
    }
    //**slider */
    const [value, setValue] = useState<number[]>([20, 37]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
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
                        <div>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
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