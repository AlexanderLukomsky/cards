import { ChangeEvent, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { _instance } from "../../api/instance"
import { Header } from "../../Components/Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { _pagesPath } from "../Routes/_path/pagesPath"
import { PacksBar } from "./PacksBar/PacksBar"
import { getPacks, setPage, setSearchPackNameValue } from "./reducer/packsReducer"
import "./packsPage.scss"
import { PacksContainer } from "./PacksContainer/PacksContainer"
export const PacksPage = () => {
   const isAuth = useAppSelector(state => state.auth.isAuth)
   const dispatch = useAppDispatch()
   const { packs } = useAppSelector(state => state)
   useEffect(() => {
      dispatch(getPacks({}))
   }, [packs.isAuthUserPacks, packs.data.filterValues, packs.data.page, packs.data.searchPackNameValue])
   const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
      dispatch(setPage({ page }))
   }
   const searchPacks = (value: string) => {
      dispatch(setSearchPackNameValue({ searchPackNameValue: value }))
   }
   if (!isAuth) return <Navigate to={_pagesPath.MAIN} />
   return (
      <div className="packs">
         <div className="container">
            <Header />
            <div className="packs__columns">
               <PacksBar />
               <PacksContainer
                  setSearchValue={searchPacks}
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