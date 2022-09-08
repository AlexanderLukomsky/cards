import { ChangeEvent, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { _pagesPath } from "../Routes/_path/pagesPath"
import { PacksBar } from "./PacksBar/PacksBar"
import { getPacks, setPage, setPageCount, setSearchPackNameValue } from "./reducer/packsReducer"
import "./packsPage.scss"
import { Packs } from "./Packs/Packs"
import { PageCountType } from "../../commonTypes/types"
export const PacksPage = () => {
   const isAuth = useAppSelector(state => state.auth.isAuth)
   const dispatch = useAppDispatch()
   const { packs } = useAppSelector(state => state)
   const navigate = useNavigate()
   useEffect(() => {
      if (!isAuth) {
         navigate(_pagesPath.MAIN)
         return
      }
      dispatch(getPacks({}))
   }, [dispatch, isAuth, navigate,
      packs.isAuthUserPacks,
      packs.data.filterValues,
      packs.data.page,
      packs.data.searchPackNameValue,
      packs.data.pageCount,
      packs.updatePack
   ])
   const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
      dispatch(setPage({ page }))
   }
   const onSearchPacks = useCallback((value: string) => {
      dispatch(setSearchPackNameValue({ searchPackNameValue: value }))
   }, [dispatch])
   const onChagePageCount = (value: number) => {
      //value only 5 || 10 || 15
      const pageCount = value as PageCountType
      dispatch(setPageCount({ pageCount }))
   }
   if (!isAuth) { return <></> }
   return (
      <div className="packs-page">
         <div className="container">
            <Header />
            <div className="packs-page__columns">
               <PacksBar />
               <Packs
                  progressStatus={packs.packsStatus}
                  onChagePageCount={onChagePageCount}
                  onSearchPacks={onSearchPacks}
                  packs={packs.data.cardPacks}
                  onChangePage={onChangePage}
                  title='Packs list'
                  page={packs.data.page}
                  isInitialized={packs.isInitialized}
                  pageCount={packs.data.pageCount}
                  cardPacksTotalCount={packs.data.cardPacksTotalCount}
               />
            </div>
         </div>
      </div>
   )
}