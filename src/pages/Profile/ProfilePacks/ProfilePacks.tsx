import { ChangeEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { PacksContainer } from "../../PacksPage/PacksContainer/PacksContainer"
import { getProfilePacks } from "../reducer/profileReducer"

export const ProfilePacks = () => {
   const dispatch = useAppDispatch()
   const userName = useAppSelector(state => state.auth.authData.name)
   const { profile } = useAppSelector(state => state)
   useEffect(() => {
      dispatch(getProfilePacks())
   }, [])
   const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
      //    dispatch(changePacksPageAC({ page }))
   }
   return (
      <PacksContainer
         setSearchValue={(value: string) => { }}
         packs={profile.packsData.cardPacks}
         onChangePage={onChangePage}
         title={`Packs list ${userName}`}
         page={profile.packsData.page}
         isInitialized={profile.isInitialized}
         pageCount={profile.packsData.pageCount}
         cardPacksTotalCount={profile.packsData.cardPacksTotalCount}
      />
   )
}