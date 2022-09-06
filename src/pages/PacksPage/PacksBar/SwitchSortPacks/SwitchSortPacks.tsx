import React from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { setIsAuthUserPacks } from "../../reducer/packsReducer"

export const SwitchSortPacks = React.memo(() => {
   const isAuthUserPacks = useAppSelector(state => state.packs.isAuthUserPacks)
   const dispatch = useAppDispatch()
   const switchAllPacks = () => {
      dispatch(setIsAuthUserPacks({ isAuthUserPacks: false }))
   }
   const switchAuthUserPack = () => {
      dispatch(setIsAuthUserPacks({ isAuthUserPacks: true }))
   }
   return (
      <div className="switch-sort-packs">
         <button onClick={switchAuthUserPack} className={`switch-sort-packs__btn ${isAuthUserPacks ? ' active' : ''}`}>MY</button>
         <button onClick={switchAllPacks} className={`switch-sort-packs__btn ${isAuthUserPacks ? '' : ' active'}`}>ALL</button>
      </div>
   )
})