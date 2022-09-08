import { Navigate } from "react-router-dom"
import { Header } from "../Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { _pagesPath } from "../Routes/_path/pagesPath"
import "./profilePage.scss"
import { ProfileBar } from "./ProfileBar/ProfileBar"
import { ChangeEvent, useEffect } from "react"
import { getProfilePacks, setProfilePage, setProfilePageCount, setProfileSeacrhPackName } from "./reducer/profileReducer"
import { Packs } from "../PacksPage/Packs/Packs"
import { PageCountType } from "../../commonTypes/types"
export const Profile = () => {
   const dispatch = useAppDispatch()
   const userName = useAppSelector(state => state.auth.authData.name)
   const isAuth = useAppSelector(state => state.auth.isAuth)
   const { profile } = useAppSelector(state => state)
   const { updatePack } = useAppSelector(state => state.packs)
   useEffect(() => {
      dispatch(getProfilePacks())
   }, [
      dispatch,
      profile.data.page,
      profile.data.pageCount,
      profile.data.searchPackNameValue,
      profile.data.filterValues,
      updatePack
   ])
   const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
      dispatch(setProfilePage({ page }))
   }
   const onChagePageCount = (value: number) => {
      //value only 5 || 10 || 15
      const pageCount = value as PageCountType
      dispatch(setProfilePageCount({ pageCount }))
   }
   const onSearchPacks = (searchPackNameValue: string) => {
      dispatch(setProfileSeacrhPackName({ searchPackNameValue }))
   }
   if (!isAuth) return <Navigate to={_pagesPath.MAIN} />
   return (
      <div className="profile-page">
         <div className="container">
            <Header />
            <div className="profile-page__columns">
               <ProfileBar />
               <Packs
                  progressStatus={profile.profileStatus}
                  onChagePageCount={onChagePageCount}
                  onSearchPacks={onSearchPacks}
                  packs={profile.data.cardPacks}
                  onChangePage={onChangePage}
                  title={`Packs list ${userName}`}
                  page={profile.data.page}
                  isInitialized={profile.isInitialized}
                  pageCount={profile.data.pageCount}
                  cardPacksTotalCount={profile.data.cardPacksTotalCount}
               />
            </div>
         </div>
      </div>
   )
}